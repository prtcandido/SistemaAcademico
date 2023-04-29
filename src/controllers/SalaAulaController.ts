import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class SalaAulaController {
    async index(req: Request, res: Response)
    {        
        const prisma = new PrismaClient();        
        const salaAula = await prisma.salaAula.findMany(
            {
                orderBy:{id:'asc'},
                select:{                    
                    id:true,
                    tipo: true,
                    temProjetor: true,
                    bloco:true,
                    quantidadeCadeiras: true,
                    quantidadeComputadores: true,
                    turma: true
                }                    
            }               
        );

        // recupera todas as salas de aulas        
        res.status(200).json(salaAula);    
    }

    async show(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const salaAula = await prisma.salaAula.findUnique( 
            // busca sala de aula  conforme where            
            {                
                where:{id: Number(req.params.id)},                
                select:{id:true,
                    tipo: true,
                    temProjetor: true,
                    bloco:true,
                    quantidadeCadeiras: true,
                    quantidadeComputadores: true,
                    turma: true}    
                // quais dados se quer no resultado            
            }         
        );        
        res.status(200).json(salaAula);    
    }

    async store(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        //obtém json vindo do cliente        
        const dados = req.body;        
        //console.log(dados);        
        const novaSala = await prisma.salaAula.create(
            {                
                data: dados,                
                select: {                    
                    id:true,
                    tipo: true,
                    temProjetor: true,
                    bloco:true,
                    quantidadeCadeiras: true,
                    quantidadeComputadores: true,
                    turma: true                                    
                }            
            }        
        );        
        res.status(200).json(novaSala);    
    }

    async update(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const salaAlterada = await prisma.salaAula.update(            
            {                
                where: {id: Number(req.params.id) },                
                data: req.body,                
                select: {                    
                    id:true,
                    tipo: true,
                    temProjetor: true,
                    bloco:true,
                    quantidadeCadeiras: true,
                    quantidadeComputadores: true,
                    turma: true                                    
                }            
            }        
        );        
        res.status(200).json(salaAlterada);    
    }

    async delete(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        await prisma.salaAula.delete(            
            {                
                where: {id: Number(req.params.id) }            
            }        
        );        
        res.status(200).json({excluido: true});    
    }
}

export default SalaAulaController
