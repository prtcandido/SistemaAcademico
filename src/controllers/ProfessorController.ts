import { Request, Response } from "express";
import prisma from "../prisma";

export class ProfessorController {
  async getAll(req: Request, res: Response) {
    const cursos = await prisma.professor.findMany();

    if (cursos.length === 0) {
      return res.status(404).send();
    }

    return res.json(cursos);
  }
}