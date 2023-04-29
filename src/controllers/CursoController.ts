import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class CursoController {
    async index(req: Request, res: Response)
    {        
        const prisma = new PrismaClient();        
        const curso = await prisma.curso.findMany(
            {
                orderBy:{nome:'asc'},
                select:{                    
                    id:true,
                    nome: true,
                    descricao: true,
                    professorId:true,
                    coordenador: true,
                    aluno: true,
                    turma: true
                }                    
            }               
        );

        // recupera todas as salas de aulas        
        res.status(200).json(curso);    
    }

    async show(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const curso = await prisma.curso.findUnique( 
            // busca sala de aula  conforme where            
            {                
                where:{id: Number(req.params.id)},                
                select:{id:true,
                    nome: true,
                    descricao: true,
                    professorId:true,
                    coordenador: true,
                    aluno: true,
                    turma: true    
                } // quais dados se quer no resultado            
            }         
        );        
        res.status(200).json(curso);    
    }

    async store(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        //obtém json vindo do cliente        
        const dados = req.body;        
        //console.log(dados);        
        const novoCurso = await prisma.curso.create(
            {                
                data: dados,                
                select: {                    
                    id:true,
                    descricao: true,
                    professorId:true,
                    coordenador: true,
                    aluno: true,
                    turma: true                                      
                }            
            }        
        );        
        res.status(200).json(novoCurso);    
    }

    async update(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const cursoAlterado = await prisma.curso.update(            
            {                
                where: {id: Number(req.params.id) },                
                data: req.body,                
                select: {                    
                    id:true,
                    descricao: true,
                    professorId:true,
                    coordenador: true,
                    aluno: true,
                    turma: true                                    
                }            
            }        
        );        
        res.status(200).json(cursoAlterado);    
    }

    async delete(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        await prisma.curso.delete(            
            {                
                where: {id: Number(req.params.id) }            
            }        
        );        
        res.status(200).json({excluido: true});    
    }
}

export default CursoController
