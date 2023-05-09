import { Request, Response } from 'express';
import { Aula, PrismaClient } from '@prisma/client';
import { PdfCreator } from '../common/PdfCreator';
import { S3ClientService } from '../common/S3Client';

export class TurmaController {
  async generateClassPlanningReport(req: Request, res: Response) {
    const prisma = new PrismaClient();
    const pdfCreator = new PdfCreator();
    const s3ClientService = new S3ClientService();

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

    const pdf = await pdfCreator.create({ aulas: aulas });

    if (pdf.length <= 0) {
      res.status(500).json({ error: true, message: 'Falha ao criar PDF' });
    }

    const fileName = `planejamento-aula/${id}.pdf`;

    await s3ClientService.sendFile(fileName, pdf);

    res.status(200).json({
      success: true,
      file: `${process.env.BUCKET_FILE_BASEURL}${fileName}${process.env.BUCKET_ACCESS_PARAMS}`,
      ttl: 300,
    });
  }
}
