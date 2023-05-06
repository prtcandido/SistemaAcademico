import { Request, Response } from 'express'

import prisma from "../prisma"
import { ZodError, z } from 'zod'

const AlunoTurma = z.object({
  id: z.number(),
  turmaId: z.number(),
  alunoId: z.number(),
});
const Turma = z.object({
  id: z.number(),
  cursoId: z.number(),
  salaAulaId: z.number(),
  professorId: z.number(),
  disciplinaId: z.number(),
  semestreId: z.number(),
  alunoTurma: z.array(AlunoTurma),
});

type AlunoTurmaType = z.infer<typeof AlunoTurma>;
type TurmaType = z.infer<typeof Turma>;

export class TurmaController {

  async create(req: Request, res: Response) {
    let body
    
    try {
      body = Turma.parse(req.body);
    } catch (exception) {
      const zodException: ZodError = exception as any;

      return res
        .status(400)
        .json({ error: zodException.message });
    }

    let novaTurma;
    try {
      novaTurma = await prisma.turma.create({
        data: body as any
      })
    } catch (error) {
      return res.status(400).json({ error: "Erro ao tentar criar uma turma." })
    }
    
    return res.json({ novaTurma });
  }

  async update(req: Request, res: Response) {
    let body, turmaId;

    try {
      body = Turma.parse(req.body);
      
      turmaId = z.number()
        .parse(Number(req.params.id));
    } catch (exception) {
      const zodException: ZodError = exception as any;

      return res
        .status(400)
        .json({ error: zodException.message });
    }
    
    let alunoAlterado;
    try {
      alunoAlterado = await prisma.turma.update({
        where:{ id: turmaId },
        data: body as any,
        select: {
          id: true,
          cursoId: true,
          alunoTurma: true,
          salaAulaId: true,
          salaAula: true,
          professorId: true,
          professor: true,
          disciplinaId: true,
          semestreId: true,
          semestre: true,
          aula: true,
          prova: true,
        }
      });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao tentar atualizar a turma." })
    }
    
      return res.json({ alunoAlterado });
  }
 
  async delete(req: Request, res: Response) {
    let turmaId
    try {
      turmaId = z.number()
        .parse(Number(req.params.id));
    } catch (exception) {
      const zodException: ZodError = exception as any;

      return res
        .status(400)
        .json({ error: zodException.message });
    }
    
    try {
      await prisma.turma.delete({
        where: {
          id: turmaId
        }
      });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao tentar deletar a turma." });
    }
    
    return res.status(200).json({ message: "Turma deletada." });
  }

  async atribuirAluno(req: Request, res: Response) {
    let body;

    try {
      body = AlunoTurma.parse(req.body);
    } catch (exception) {
      const zodException: ZodError = exception as any;

      return res
        .status(400)
        .json({error: zodException.message});
    }

    let novoAluno;
    try {
      novoAluno = await prisma.alunoTurma.create({
        data: body
      });
    } catch (exception) {
      return res.status(400).json({error: "Ocorreu um erro ao tentar adicionar um aluno a turma." })
    }

    return res.json(novoAluno);
  }

  async removerAluno(req: Request, res: Response) {
    let alunoId;

    try {
      alunoId = z.number()
        .parse(Number(req.params.id));
    } catch (exception) {
      const zodException: ZodError = exception as any;

      return res
        .status(400)
        .json({ error: zodException.message });
    }
    
    try {
      await prisma.alunoTurma.delete({
        where: {
          id: alunoId,
        }
      });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao tentar remover aluno." });
    }
    
    return res.status(200).json({ message: "Aluno removido." });
  }
} 
