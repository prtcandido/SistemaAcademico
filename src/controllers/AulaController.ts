import { Request, Response } from 'express';
import { Aula, PrismaClient } from '@prisma/client';

export class AulaController {
  async index(req: Request, res: Response) {
    const prisma = new PrismaClient();

    const aulas = await prisma.aula.findMany({
      orderBy: { id: 'asc' },
    });

    res.status(200).json(aulas);
  }

  async show(req: Request, res: Response) {
    const prisma = new PrismaClient();

    const aula = await prisma.aula.findUnique({
      where: { id: Number(req.params.id) },
    });

    res.status(200).json(aula);
  }

  async store(req: Request, res: Response) {
    const prisma = new PrismaClient();

    const { dataProgramada, ...resto } = req.body;

    const novaAula: Aula = await prisma.aula.create({
      data: { dataProgramada: new Date(dataProgramada), ...resto },
    });

    res.status(200).json(novaAula);
  }

  async update(req: Request, res: Response) {
    const prisma = new PrismaClient();

    const { dataProgramada, ...resto } = req.body;

    const aulaAlterada = await prisma.aula.update({
      where: { id: Number(req.params.id) },
      data: { dataProgramada: new Date(dataProgramada), ...resto },
    });

    res.status(200).json(aulaAlterada);
  }

  async delete(req: Request, res: Response) {
    const prisma = new PrismaClient();

    await prisma.aula.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(200).json({ excluido: true });
  }
}
