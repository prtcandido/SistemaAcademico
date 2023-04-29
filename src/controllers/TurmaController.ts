import { Request, Response } from 'express'

import prisma from "../prisma"

interface AlunoTurma {
  id: number,
  turmaId: number,
  alunoId: number
}

interface Turma {
  id: number,
  cursoId: number,
  salaAulaId: number,
  professorId: number,
  disciplinaId: number,
  semestreId: number,
  alunoTurma: AlunoTurma[]
}

export class TurmaController {
  async create(req: Request, res: Response) {
    const turma: Turma = req.body;
    
    prisma.turma.create({
      data: turma as any
    })
  }

  async delete(req: Request, res: Response) {
    try {
      const rawTurmaId: string = req.params.turmaId
      const turmaId = Number(rawTurmaId)

      await prisma.turma.delete({
        where: {
          id: turmaId
        }
      })

      res.json({ message: "Turma deletada." })
    } catch (error) {
      res.status(400).json({ error: "Ocorreu um erro ao tentar deletar a turma." })
    }
  }
} 
