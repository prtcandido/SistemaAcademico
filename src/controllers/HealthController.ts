import { Request, Response } from 'express';

export class HealthController {
  async index(req: Request, res: Response) {
    res.status(200).json('Ok');
  }
}
