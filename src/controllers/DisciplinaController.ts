import {Request, Response} from 'express'; 
import {PrismaClient} from '@prisma/client';

class DisciplinaController {    
    
    async index(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const disciplina = await prisma.disciplina.findMany(
            {
                orderBy:{nome:'asc'},
                select:{                    
                    nome:true,
                    ementa:true,
                    cargaHoraria: true,
                    itemBibliografia:{
                        select:{
                            titulo: true,
                        }
                    },
                    materialDidatico:{
                        select:{
                            nomeArquivoOriginal: true,
                        }
                    },
                    turma:true
                }
            }               
        ); 
        // recupera todos os produto        
        res.status(200).json(disciplina);    
    }

    async show(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const disciplina = await prisma.disciplina.findUnique( 
            // busca produto conforme where            
            {                
                where:{id: Number(req.params.id)},                
                select:{
                    id:true,
                    nome:true,
                    ementa:true,
                    cargaHoraria: true,
                    itemBibliografia: true,
                    materialDidatico: true,
                    turma: true
                }    
                // quais dados se quer no resultado            
            }         
        );        
        res.status(200).json(disciplina);    
    }

    async store(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        //obtém json vindo do cliente        
        const dados = req.body;        
        //console.log(dados);        
        const novaDisciplina = await prisma.disciplina.create(
            {                
                data: dados,                
                select: {                    
                    id:true,                    
                    nome:true,                    
                    ementa:true                
                }            
            }        
        );        
        res.status(200).json(novaDisciplina);    
    }

    async update(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        const disciplinaAlterado = await prisma.disciplina.update(            
            {                
                where: {id: Number(req.params.id) },                
                data: req.body,                
                select: {                    
                    id:true,                    
                    nome:true,                    
                    ementa:true                
                }            
            }        
        );        
        res.status(200).json(disciplinaAlterado);    
    }

    async delete(req:Request,res:Response)
    {        
        const prisma = new PrismaClient();        
        await prisma.disciplina.delete(            
            {                
                where: {id: Number(req.params.id) }            
            }        
        );        
        res.status(200).json({excluido: true});    
    }
}

export default DisciplinaController