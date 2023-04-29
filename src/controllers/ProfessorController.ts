import {Request, Response} from 'express'; 
import {PrismaClient} from '@prisma/client';

class ProfessorController {    
    
    async index(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const professor = await prisma.professor.findMany(
            {
                orderBy:{nome:'asc'},
                select:{                    
                    nome:true,
                    lattes:true,
                    email: true,
                    telefone: true,
                    coordena:{
                        select:{
                            nome: true,
                            descricao: true
                        }
                    },
                    turma:true
                }
            }               
        ); 
        // recupera todos os produto        
        res.status(200).json(professor);    
    }

    async show(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const professor = await prisma.professor.findUnique( 
            // busca produto conforme where            
            {                
                where:{id: Number(req.params.id)},                
                select:{
                    id:true,
                    nome:true,
                    email:true,
                    lattes: true,
                    telefone: true,
                    coordena: true,
                    turma: true
                }    
                // quais dados se quer no resultado            
            }         
        );        
        res.status(200).json(professor);    
    }

    async store(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        //obtém json vindo do cliente        
        const dados = req.body;        
        //console.log(dados);        
        const novoProfessor = await prisma.professor.create(
            {                
                data: dados,                
                select: {                    
                    id:true,                    
                    nome:true,                    
                    email:true                
                }            
            }        
        );        
        res.status(200).json(novoProfessor);    
    }

    async update(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const professorAlterado = await prisma.professor.update(            
            {                
                where: {id: Number(req.params.id) },                
                data: req.body,                
                select: {                    
                    id:true,                    
                    nome:true,                    
                    email:true                
                }            
            }        
        );        
        res.status(200).json(professorAlterado);    
    }

    async delete(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        await prisma.professor.delete(            
            {                
                where: {id: Number(req.params.id) }            
            }        
        );        
        res.status(200).json({excluido: true});    
    }
}

export default ProfessorController