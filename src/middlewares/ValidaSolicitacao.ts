import { Request, Response, NextFunction } from 'express';

function ValidaSolicitacaoId(req:Request, res:Response, next:NextFunction) {
    const id = req.query.id;

    if (Number(id) == null) {
        res.status(400).send("Parâmetros inválidos")
    }
}

export default ValidaSolicitacaoId;