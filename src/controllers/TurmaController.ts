import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PdfCreator } from '../common/PdfCreator';
import { FirebaseClient } from '../common/FirebaseClient';

export class TurmaController {
  async generateClassPlanningReport(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const pdfCreator = new PdfCreator();
    const firebaseClient = new FirebaseClient();

    const { id } = req.params;

    const aulas = await prisma.aula.findMany({
      select: {
        dataProgramada: true,
        tecnicaMetodologica: true,
        conteudoProgramatico: true,
      },
      where: {
        turmaId: Number(id),
      },
      orderBy: { dataProgramada: 'asc' },
    });

    if (aulas.length <= 0) {
      res.status(404).json({
        error: true,
        message: 'Nenhuma aula encontrada para a turma escolhida',
      });
    }

    const pdf = await pdfCreator.create({ aulas: aulas, teste: 'teste' });

    if (pdf.length <= 0) {
      res.status(500).json({ error: true, message: 'Falha ao criar PDF' });
    }

    const filePath = 'planejamento-aula/';

    const fileName = `${id}.pdf`;

    const responseFile = await firebaseClient.sendFile(
      filePath,
      fileName,
      pdf,
      'application/pdf'
    );

    res.status(200).json(responseFile);
  }
}
