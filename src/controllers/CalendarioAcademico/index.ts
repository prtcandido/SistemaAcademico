import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CalendarioAcademicoController {

    async getAll(req: Request, res: Response) {
        const calendario = await prisma.itemCalendario.findMany(
            {
                orderBy: { periodoAte: 'asc' },
                select: {
                    periodoDe: true,
                    periodoAte: true,
                    descricao: true,
                    haveraAula: true,
                    semestre: {
                        select: {
                            descricao: true,
                            sigla: true
                        }
                    }
                }
            }
        );
        // recupera todas informações de calendario Academico        
        res.status(200).json(calendario);
    }

    async getItem(req: Request, res: Response) {
        const calendario = await prisma.itemCalendario.findUnique(
            // busca todos dados do calendario conforme o where            
            {
                where: {
                    id: Number(req.params.id)
                },
                select: {
                    id: true,
                    periodoDe: true,
                    periodoAte: true,
                    descricao: true,
                    haveraAula: true,
                    semestreId: true                
                }
            }
        );
        res.status(200).json(calendario);
    }

    async createItem(req: Request, res: Response) {
        const dados = req.body;
        //console.log(dados);        
        const calendario = await prisma.itemCalendario.create(
            {
                data: dados,
            }
        );
        res.status(200).json(calendario);
    }

    async updateItem(req: Request, res: Response) {
        try {
          const produtoAlterado = await prisma.itemCalendario.update({
            where: { id: Number(req.params.id) },
            data: req.body,
            select: {
              id: true,
              periodoDe: true,
              periodoAte: true,
              descricao: true,
              haveraAula: true,
              semestreId: true,
            },
          });
          res.status(200).json(produtoAlterado);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro ao atualizar o item do calendário.' });
        }
      }
      
      

    async deleteItem(req:Request,res:Response){        
        await prisma.itemCalendario.delete({                
                where: {id: Number(req.params.id) }            
        });        
        res.status(200).json({excluido: true});    
    }

}


export default CalendarioAcademicoController