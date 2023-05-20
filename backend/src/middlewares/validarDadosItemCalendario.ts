import { Request, Response, NextFunction } from 'express';

interface ItemCalendario {
  periodoDe: Date;
  periodoAte: Date;
  descricao: string;
  haveraAula: boolean;
  semestreId: number;
}

function validarDadosItemCalendario(req: Request, res: Response, next: NextFunction) {
  const { periodoDe, periodoAte, descricao, haveraAula, semestreId } = req.body as ItemCalendario;

  // Validação do período de datas
  if (!periodoDe || !periodoAte || periodoDe >= periodoAte) {
    return res.status(400).json({ mensagem: 'Período inválido' });
  }

  // Validação da descrição
  if (!descricao || descricao.trim().length === 0 || descricao.length > 100) {
    return res.status(400).json({ mensagem: 'Descrição inválida' });
  }

  // Validação da flag haveraAula
  if (typeof haveraAula !== 'boolean') {
    return res.status(400).json({ mensagem: 'Valor inválido para haveraAula' });
  }

  // Validação do semestreId
  if (!semestreId || typeof semestreId !== 'number') {
    return res.status(400).json({ mensagem: 'Semestre inválido' });
  }

  // Se chegou aqui, os dados são válidos
  next();
}

export default validarDadosItemCalendario;
