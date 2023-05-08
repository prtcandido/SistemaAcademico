import { Request, Response } from 'express';

export class HealthController {
  // async index(req: Request, res: Response) {
  //   const prisma = new PrismaClient();
  //   const produtos = await prisma.produto.findMany({
  //     orderBy: { nome: 'asc' },
  //     select: {
  //       nome: true,
  //       preco: true,
  //       categoria: {
  //         select: { nome: true },
  //       },
  //     },
  //   });
  //   // recupera todos os produto
  //   res.status(200).json(produtos);
  // }

  // async show(req: Request, res: Response) {
  //   const prisma = new PrismaClient();
  //   const produto = await prisma.produto.findUnique(
  //     // busca produto conforme where
  //     {
  //       where: { id: Number(req.params.id) },
  //       select: { id: true, nome: true, preco: true },
  //       // quais dados se quer no resultado
  //     }
  //   );
  //   res.status(200).json(produto);
  // }

  async index(req: Request, res: Response) {
    res.status(200).json('Ok');
  }

  // async update(req: Request, res: Response) {
  //   const prisma = new PrismaClient();
  //   const produtoAlterado = await prisma.produto.update({
  //     where: { id: Number(req.params.id) },
  //     data: req.body,
  //     select: {
  //       id: true,
  //       nome: true,
  //       preco: true,
  //     },
  //   });
  //   res.status(200).json(produtoAlterado);
  // }

  // async delete(req: Request, res: Response) {
  //   const prisma = new PrismaClient();
  //   await prisma.produto.delete({
  //     where: { id: Number(req.params.id) },
  //   });
  //   res.status(200).json({ excluido: true });
  // }
}
