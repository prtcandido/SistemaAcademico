import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SolicitacaoController {

  async store(req: Request, res: Response) {
    try {
      const { assunto, descricao, alunoId } = req.body;
      const novaSolicitacao = await prisma.solicitacao.create({
        data: {
          assunto,
          descricao,
          alunoId: Number(alunoId),
          dataAbertura: new Date() // Data atual
        },
        select: {
          id: true,
          assunto: true,
          descricao: true,
          dataAbertura: true,
          alunoId: true,
        }
      });
      res.status(201).json(novaSolicitacao);
    }
    catch (err) {
      res.status(400).json({ message: "Erro ao criar a solicitação" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const solicitacao = await prisma.solicitacao.findUnique(
        {
          where: { id: Number(req.params.id) },
          select: {
            id: true,
            assunto: true,
            descricao: true,
            dataAbertura: true,
            alunoId: true,
            resposta: true
          }
        }
      )

      res.status(200).json(solicitacao);
    } catch (error) {
      res.status(400).json({ message: "Erro ao recuperar solicitação" })
    }
  }

  async index(req: Request, res: Response) {
    try {
      const solicitacoes = await prisma.solicitacao.findMany(
        {
          orderBy: { dataAbertura: 'desc' },
          select: {
            id: true,
            assunto: true,
            descricao: true,
            dataAbertura: true,
            alunoId: true,
            resposta: true
          }
        }
      )
      if (solicitacoes.length === 0) {
        res.status(204).json()
      }
      else {
        res.status(200).json(solicitacoes)
      }
    } catch (error) {
      res.status(400).json({ message: "Erro ao recuperar solicitações" })
    }
  }

  async listByAlunoId(req: Request, res: Response) {
    try {
      const alunoId = Number(req.params.id)
      const solicitacoes = await prisma.solicitacao.findMany({
        where: { alunoId: alunoId },
        orderBy: { dataAbertura: 'desc' },
        select: {
          id: true,
          assunto: true,
          descricao: true,
          dataAbertura: true,
          alunoId: true,
          resposta: true,
          dataResposta: true,
        },
      });
      res.status(200).json(solicitacoes);
    } catch (error) {
      res.status(400).json({ message: 'Erro ao listar solicitações' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const jsonResposta = req.body.resposta;
      const resposta = await prisma.solicitacao.update({
        where: { id: Number(req.params.id) },
        data: {
          resposta: jsonResposta,
          dataResposta: new Date()
        },
        select: {
          id: true,
          assunto: true,
          descricao: true,
          dataAbertura: true,
          alunoId: true,
          resposta: true,
          dataResposta: true
        }
      })
      res.status(200).json(resposta)
    } catch (error) {
      res.status(400).json({ message: "Erro ao atualizar solicitação" })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await prisma.solicitacao.delete({
        where: { id: Number(req.params.id) },
      })

      res.status(200).json("Solicitação excluída")
    } catch (error) {
      res.status(400).json("Erro ao deletar solicitação")
    }
  }
}

export default SolicitacaoController;
