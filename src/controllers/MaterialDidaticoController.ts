import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from "multer";
import path from "path";


class materialDidaticoController {

    async index(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const materialDidatico = await prisma.materialDidatico.findMany(
            {
                orderBy: { nomeArquivoOriginal: 'asc' },
                select: {
                    nomeArquivoOriginal: true,
                    nomeArquivoInterno: true,
                    autores: true,
                    disciplina: true
                }
            }
        );
        // recupera todos os produto        
        res.status(200).json(materialDidatico);
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const materialDidatico = await prisma.materialDidatico.findUnique(
            // busca produto conforme where            
            {
                where: { id: Number(req.params.id) },
                select: {
                    nomeArquivoOriginal: true,
                    nomeArquivoInterno: true,
                    autores: true,
                    disciplinaId: true,
                    disciplina: {
                        select: {
                            id: true,
                            nome: true
                        }
                    }
                }
                // quais dados se quer no resultado            
            }
        );
        res.status(200).json(materialDidatico);
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { disciplinaId, autores } = req.body;
        const { nomeArquivoOriginal, nomeArquivoInterno } = req.file?.path;
        //obtém json vindo do cliente               
        //console.log(dados);        
        const novomaterialDidatico = await prisma.materialDidatico.create(
            {
                data: {
                    disciplinaId: parseInt(disciplinaId),
                    nomeArquivoOriginal,
                    nomeArquivoInterno,
                    autores
                },
                select: {
                    id: true,
                    nomeArquivoOriginal: true
                }
            }
        );
        res.status(200).json(novomaterialDidatico);
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient();
        const { disciplinaId, autores } = req.body;
        const { nomeArquivoOriginal, nomeArquivoInterno } = req.file?.path;
        //obtém json vindo do cliente               
        //console.log(dados);        
        const materialDidaticoAlterado = await prisma.materialDidatico.update(
            {
                where: { id: Number(req.params.id) },

                data: {
                    disciplinaId: parseInt(disciplinaId),
                    nomeArquivoOriginal,
                    nomeArquivoInterno,
                    autores
                },
                select: {
                    id: true,
                    nomeArquivoOriginal: true
                }

            }
        );
        res.status(200).json(materialDidaticoAlterado);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.materialDidatico.delete(
            {
                where: { id: Number(req.params.id) }
            }
        );
        res.status(200).json({ excluido: true });
    }
}

export default materialDidaticoController