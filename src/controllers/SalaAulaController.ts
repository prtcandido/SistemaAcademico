import { Request, Response } from "express";
import prisma from "../prisma";

export class SalaAulaController {
  async getAll(req: Request, res: Response) {
    const cursos = await prisma.salaAula.findMany();

    if (cursos.length === 0) {
      return res.status(404).send();
    }

    return res.json(cursos);
  }
}