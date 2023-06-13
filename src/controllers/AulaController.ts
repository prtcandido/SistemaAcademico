import { Request, Response } from 'express';
import { Aula } from '@prisma/client';
import prismaClient from '../common/PrismaClient';
import { brDateToUS } from '../common/utils';

export class AulaController {
  async index(req: Request, res: Response) {
    try {
      const aulas = await prismaClient.aula.findMany({
        orderBy: { id: 'asc' },
      });

      res.status(200).json(aulas);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const aula = await prismaClient.aula.findUnique({
        where: { id: Number(req.params.id) },
      });

      res.status(200).json(aula);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { dataProgramada, ...resto } = req.body;

      const dataProgramadaUs = brDateToUS(dataProgramada);

      const novaAula: Aula = await prismaClient.aula.create({
        data: {
          dataProgramada: new Date(dataProgramadaUs),
          ...resto,
        },
      });

      res.status(200).json(novaAula);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { dataProgramada, ...resto } = req.body;

      const dataProgramadaUs = brDateToUS(dataProgramada);

      const aulaAlterada = await prismaClient.aula.update({
        where: { id: Number(req.params.id) },
        data: { dataProgramada: new Date(dataProgramadaUs), ...resto },
      });

      res.status(200).json(aulaAlterada);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await prismaClient.aula.delete({
        where: { id: Number(req.params.id) },
      });

      res.status(200).json({ excluido: true });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}
