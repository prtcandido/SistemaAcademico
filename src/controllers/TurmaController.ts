import { Request, Response } from 'express'

import prisma from "../prisma"
import { ZodError, z } from 'zod'
import { Prisma } from '@prisma/client';

const AlunoTurma = z.object({
  id: z.number()
    .optional(),
  turmaId: z.number(),
  alunoId: z.number(),
});

const Turma = z.object({
  id: z.number()
    .optional(),
  cursoId: z.number(),
  salaAulaId: z.number(),
  professorId: z.number(),
  disciplinaId: z.number(),
  semestreId: z.number(),
  alunoTurma: z.array(AlunoTurma.omit({ turmaId: true }))
    .optional(),
});

type AlunoTurmaType = z.infer<typeof AlunoTurma>;
type TurmaType = z.infer<typeof Turma>;

export class TurmaController {

  private _filtrarAlunoTurma(turma: { alunoTurma: { aluno: any }[] }): any {
    const result: any = turma;
    result.alunos = turma.alunoTurma.map(({ aluno }) => aluno);
    delete result.alunoTurma;

    return result;
  }

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

    let novaTurmaQuery: Prisma.TurmaCreateInput = {
      curso: {
        connect: {
          id: body.cursoId
        }
      },
      disciplina: {
        connect: {
          id: body.disciplinaId
        }
      },
      professor: {
        connect: {
          id: body.professorId
        }
      },
      salaAula: {
        connect: {
          id: body.salaAulaId
        }
      },
      semestre: {
        connect: {
          id: body.semestreId
        }
      }
    };

    if (!!body.alunoTurma) {
      novaTurmaQuery.alunoTurma = {};

      novaTurmaQuery.alunoTurma.connect = body.alunoTurma
        .filter(aluno => !!aluno.id)
        .map<Prisma.AlunoTurmaWhereUniqueInput>(({ id }) => ({
          id
        }));
      
      novaTurmaQuery.alunoTurma.create = body.alunoTurma
        .filter(aluno => !aluno.id)
        .map(({ alunoId }) => ({
          alunoId
        }));
    }

    let novaTurma;
    try {
      novaTurma = await prisma.turma.create({
        data: novaTurmaQuery,
        include: {
          alunoTurma: true
        }
      });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao tentar criar uma turma." })
    }
    
    return res.json(novaTurma);
  }

  async update(req: Request, res: Response) {
    let body, turmaId;

    try {
      body = Turma
        .partial()
        .parse(req.body);
      
      turmaId = z.number()
        .parse(Number(req.params.id));
    } catch (exception) {
      const zodException: ZodError = exception as any;

      return res
        .status(400)
        .json({ error: zodException.message });
    }
    
    let turmaAlterada;
    try {
      turmaAlterada = await prisma.turma.update({
        where:{ id: turmaId },
        data: body as any,
        select: {
          id: true,
          curso: true,
          alunoTurma: {
            select: {
              aluno: true
            }
          },
          salaAula: true,
          professor: true,
          semestre: true,
          aula: true,
          prova: true,
        }
      });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao tentar atualizar a turma." })
    }

    const result = this._filtrarAlunoTurma(turmaAlterada);
    
    return res.json(result);
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
      body = z.array(AlunoTurma.omit({ id: true }))      
        .parse(req.body);
    } catch (exception) {
      const zodException: ZodError = exception as any;

      return res
        .status(400)
        .json({error: zodException.message});
    }

    let novoAluno;
    try {
      novoAluno = await prisma.alunoTurma.createMany({
        data: body
      });
    } catch (exception) {
      return res.status(400).json({error: "Ocorreu um erro ao tentar adicionar um aluno a turma." })
    }

    return res.status(200).send();
  }

  async desatribuirAluno(req: Request, res: Response) {
    let alunoId, turmaId;

    try {
      alunoId = z.number()
        .parse(Number(req.params.alunoId));
      turmaId = z.number()
        .parse(Number(req.params.turmaId));
    } catch (exception) {
      const zodException: ZodError = exception as any;

      return res
        .status(400)
        .json({ error: zodException.message });
    }
    
    try {
      await prisma.alunoTurma.delete({
        where: {
          turmaId_alunoId: {
            alunoId,
            turmaId
          },
        }
      });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao tentar remover aluno." });
    }
    
    return res.status(200).json({ message: "Aluno removido." });
  }

  async getAll(req: Request, res: Response) {
    const result = await prisma.turma.findMany({
      select: {
        id: true,
        curso: true,
        alunoTurma: {
          select: {
            aluno: true
          }
        },
        salaAula: true,
        professor: true,
        semestre: true,
        aula: true,
        prova: true,
      }
    });

    if (result.length === 0) {
      return res.status(404).send();
    }

    const formattedResult = result.map(e => this._filtrarAlunoTurma(e));

    return res.json(formattedResult);
  }

  async getById(req: Request, res: Response) {
    let turmaId;

    try {
      turmaId = z.number()
        .parse(Number(req.params.id));
    } catch (exception) {
      const zodException: ZodError = exception as any;

      return res
        .status(400)
        .json({ error: zodException.message });
    }

    const result = await prisma.turma.findFirst({
      select: {
        id: true,
        curso: true,
        alunoTurma: {
          select: {
            aluno: true
          }
        },
        salaAula: true,
        professor: true,
        semestre: true,
        aula: true,
        prova: true,
      }
    });

    if (result === null) {
      return res.status(404).send();
    }

    const formattedResult = this._filtrarAlunoTurma(result);

    return res.json(formattedResult);    
  }
} 
