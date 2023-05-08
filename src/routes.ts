// Importa componentes do express 
import {NextFunction, Request, Response, Router} from 'express'; 
// Importa TesteController 
import TesteController from './controllers/TesteController'; 
// Importar ProdutoController
// Validação dos parâmetos da rota 
import ValidaTeste1 from './middlewares/ValidaTeste1';
import { TurmaController } from './controllers/TurmaController';
// Instancia roteador 

function aplicarRota<T> (controller: T, rota: keyof T) {
  return (req: Request, res: Response, next: NextFunction) => (controller[rota] as any)(req, res, next);
}

const Roteador = Router(); 
// Define rota tipo get que, para funcionar, deve ser requisitada conforme exemplo. 
// Exemplo de requisição: localhost:4000/teste/123?num=456 
// Onde 123 e 456 podem ser substituídos por quaisquer valores 
Roteador.get(    // URL com parêmetro :id    
    '/teste/:id',    
    // Aciona função do TesteController 
    ValidaTeste1,   
    new TesteController().teste1 
); 

const turmaController = new TurmaController();
Roteador.post('/turma/', aplicarRota<TurmaController>(turmaController, "create"));
Roteador.get('/turma/', aplicarRota<TurmaController>(turmaController, "getAll"));
Roteador.get('/turma/:id', aplicarRota<TurmaController>(turmaController, "getById"));
Roteador.put('/turma/:id', aplicarRota<TurmaController>(turmaController, "update"));
Roteador.delete('/turma/:id', aplicarRota<TurmaController>(turmaController, "delete"));
Roteador.delete('/turma/:turmaId/desatribuirAluno/:alunoId', aplicarRota<TurmaController>(turmaController, "desatribuirAluno"));
Roteador.post('/turma/atribuirAluno', aplicarRota<TurmaController>(turmaController, "atribuirAluno"));

export default Roteador;