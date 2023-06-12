// Importa componentes do express 
import {NextFunction, Request, Response, Router} from 'express'; 
// Importa TesteController 
// Importar ProdutoController
// Validação dos parâmetos da rota 
import ValidaTeste1 from './middlewares/ValidaTeste1';
import { TurmaController } from './controllers/TurmaController';
import { CursoController } from './controllers/CursoController';
import { AlunoController } from './controllers/AlunoController';
import { ProfessorController } from './controllers/ProfessorController';
import { SalaAulaController } from './controllers/SalaAulaController';
import { SemestreController } from './controllers/SemestreController';
import { DisciplinaController } from './controllers/DisciplinaController';
// Instancia roteador 

function aplicarRota<T> (controller: T, rota: keyof T) {
  return (req: Request, res: Response, next: NextFunction) => (controller[rota] as any)(req, res, next);
}

const Roteador = Router(); 

const turmaController = new TurmaController();
const cursoController = new CursoController();
const alunoController = new AlunoController();
const professorController = new ProfessorController();
const salaAulaController = new SalaAulaController();
const semestreController = new SemestreController();
const disciplinaController = new DisciplinaController();

Roteador.post('/turma/', aplicarRota<TurmaController>(turmaController, "create"));
Roteador.get('/turma/', aplicarRota<TurmaController>(turmaController, "getAll"));
Roteador.get('/turma/:id', aplicarRota<TurmaController>(turmaController, "getById"));
Roteador.put('/turma/:id', aplicarRota<TurmaController>(turmaController, "update"));
Roteador.delete('/turma/:id', aplicarRota<TurmaController>(turmaController, "delete"));
Roteador.delete('/turma/:turmaId/aluno/:alunoId', aplicarRota<TurmaController>(turmaController, "desatribuirAluno"));
Roteador.post('/turma/:turmaId/aluno/:alunoId', aplicarRota<TurmaController>(turmaController, "atribuirAluno"));
Roteador.get('/curso', aplicarRota<CursoController>(cursoController, "getAll"));
Roteador.get('/aluno', aplicarRota<AlunoController>(alunoController, "getAll"));
Roteador.get('/professor', aplicarRota<ProfessorController>(professorController, "getAll"));
Roteador.get('/salaaula', aplicarRota<SalaAulaController>(salaAulaController, "getAll"));
Roteador.get('/semestre', aplicarRota<SemestreController>(semestreController, "getAll"));
Roteador.get('/disciplina', aplicarRota<DisciplinaController>(disciplinaController, "getAll"));

export default Roteador;