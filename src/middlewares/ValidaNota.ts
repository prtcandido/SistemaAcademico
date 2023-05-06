import { Request, Response, NextFunction } from 'express';

function ValidaNota (req: Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const isInteger =  Number.isInteger(id) && id > 0;

    if (!isInteger) return res.status(422).send({message: "ID: parâmetro deve ser do tipo inteiro"});
 
    return next();
}

export default ValidaNota;