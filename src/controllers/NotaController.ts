import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { omit } from 'lodash';
import * as z from 'zod';

const prisma = new PrismaClient();

const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
    EMPTY_BODY: 'Corpo Vazio',
    MISSING_PARAMETERS: 'Parâmetros Inválidos',
    NOT_FOUND: 'Não encontrado'
};

const storeNotaSchema = z.object({
    nota: z.number().min(0).max(10),
    provaId: z.number().positive(),
    alunoTurmaId: z.number().positive(),
});

const updateNotaSchema = z.object({
    nota: z.number()
});

class NotaController {
    async index(req: Request, res: Response) {
        try {
            const notas = await prisma.nota.findMany({
                orderBy: {
                    id: 'asc'
                },
                select: {
                    id: true,
                    nota: true,
                    alunoTurma: {
                        select: {
                            aluno: {
                                select: {
                                    nome: true
                                }
                            },
                            turma: {
                                select: {
                                    disciplina: {
                                        select: {
                                            nome: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    prova: {
                        select: {
                            tipo: true
                        }
                    }
                }
            });

            const notasSemAlunoTurma = notas.map((nota: { alunoTurma: { aluno: any; }; }) => {
                return {
                    ...omit(nota, 'alunoTurma'),
                    aluno: nota.alunoTurma.aluno
                }
            });

            return res.status(HTTP_STATUS.OK).json(notasSemAlunoTurma);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    async show(req: Request, res: Response) {
        try {
            const nota = await prisma.nota.findUnique({
                where: { id: Number(req.params.id) },
                select: {
                    id: true,
                    nota: true,
                    alunoTurma: {
                        select: {
                            id: true,
                            aluno: {
                                select: {
                                    id: true,
                                    nome: true
                                }
                            }
                        }
                    },
                    prova: {
                        select: {
                            tipo: true
                        }
                    }
                }
            });

            if (nota) {
                const notaSemAlunoTurma = {
                    ...omit(nota, 'alunoTurma'),
                    aluno: nota.alunoTurma.aluno,
                };

                return res.status(HTTP_STATUS.OK).json(notaSemAlunoTurma);
            } else {
                return res.status(HTTP_STATUS.NOT_FOUND).send(ERROR_MESSAGES.NOT_FOUND);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    async getNotasByProvaId(req: Request, res: Response) {
        try {
            const notas = await prisma.nota.findMany({
                where: {
                    provaId: Number(req.params.id)
                },
                select: {
                    id: true,
                    nota: true,
                    alunoTurma: {
                        select: {
                            aluno: {
                                select: {
                                    id: true,
                                    nome: true
                                }
                            }
                        }
                    }
                }
            });


            const notasSemAlunoTurma = notas.map((nota: { alunoTurma: { aluno: any; }; }) => {
                return {
                    ...omit(nota, 'alunoTurma'),
                    aluno: nota.alunoTurma.aluno
                }
            });

            return res.status(HTTP_STATUS.OK).json(notasSemAlunoTurma);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    async getNotasByAlunoId(req: Request, res: Response) {
        try {
            const aluno = await prisma.aluno.findUnique({
                where: {
                    id: Number(req.params.id)
                },
                select: {
                    id: true
                }
            });

            if (aluno?.id) {
                const notas = await prisma.nota.findMany({
                    where: {
                        alunoTurma: {
                            alunoId: aluno?.id
                        }
                    },
                    select: {
                        id: true,
                        nota: true,
                        prova: {
                            select: {
                                tipo: true,
                                turma: {
                                    select: {
                                        disciplina: {
                                            select: {
                                                nome: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });

                return res.status(HTTP_STATUS.OK).json(notas);
            } else {
                return res.status(HTTP_STATUS.NOT_FOUND).send(ERROR_MESSAGES.NOT_FOUND);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    async store(req: Request, res: Response) {
        try {
            const notaData = storeNotaSchema.parse(req.body);
            const nota = await prisma.nota.create({ data: notaData });
            return res.status(HTTP_STATUS.OK).json(nota);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
            }
            console.error(error);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const nota = await prisma.nota.findUnique({
                where: { id: Number(req.params.id) }
            })

            if (!nota) return res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });

            const notaExcluida = await prisma.nota.delete({
                where: { id: Number(req.params.id) }
            })

            return res.status(HTTP_STATUS.OK).json({ message: "Nota excluída", nota: notaExcluida });

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }

    async update(req: Request, res: Response) {
        const notaData = updateNotaSchema.parse(req.body);

        try {
            const nota = await prisma.nota.findUnique({
                where: { id: Number(req.params.id) },
            });

            if (!nota) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
            }

            const notaAtualizada = await prisma.nota.update({
                where: { id: Number(req.params.id) },
                data: notaData
            });

            return res.status(HTTP_STATUS.OK).json({ nota: notaAtualizada });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
            }
            console.error(error);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(error);
        }
    }

}

export default NotaController;