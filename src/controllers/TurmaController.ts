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

    const turma = await prisma.turma.findUnique({
      select: {
        professorId: true,
        semestreId: true,
        disciplinaId: true,
      },
      where: {
        id: Number(id),
      },
    });

    if (!turma) {
      res.status(404).json({
        error: true,
        message: `Nenhuma turma com o id ${id} encontrada`,
      });
    }

    const professor = await prisma.professor.findUnique({
      select: {
        nome: true,
      },
      where: {
        id: turma?.professorId,
      },
    });

    const semestre = await prisma.semestre.findUnique({
      select: {
        sigla: true,
      },
      where: {
        id: turma?.semestreId,
      },
    });

    const disciplina = await prisma.disciplina.findUnique({
      select: {
        nome: true,
      },
      where: {
        id: turma?.disciplinaId,
      },
    });

    if (aulas.length <= 0 || !professor || !semestre || !disciplina) {
      res.status(404).json({
        error: true,
        message: 'Falha ao buscar dados para gerar o relatório',
      });
    }

    const aulasFormatadas = aulas.map((aula) => {
      const { dataProgramada, ...resto } = aula;

      const dataFormatada = dataProgramada.toLocaleDateString('pt-BR');

      return {
        ...resto,
        dataProgramada: dataFormatada,
      };
    });

    const pdf = await pdfCreator.create({
      aulas: aulasFormatadas,
      professor,
      semestre,
      disciplina,
    });

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
