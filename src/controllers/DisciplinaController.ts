import { Request, Response } from "express";
import prisma from "../prisma";

export class DisciplinaController {
  async getAll(req: Request, res: Response) {
    const cursos = await prisma.disciplina.findMany();

    if (cursos.length === 0) {
      return res.status(404).send();
    }

    return res.json(cursos);
  }
}