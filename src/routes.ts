// Importa componentes do express 
import {Router} from 'express'; 
// Importa TesteController 
import TesteController from './controllers/TesteController'; 
// Importar ProdutoController
import ProdutoController from './controllers/ProdutoController'; 
// Validação dos parâmetos da rota 
import ValidaTeste1 from './middlewares/ValidaTeste1';
import DisciplinaController from './controllers/DisciplinaController';
import ProfessorController from './controllers/ProfessorController';
import SalaAulaController from './controllers/SalaAulaController';
import CursoController from './controllers/CursoController';
// Instancia roteador 
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

Roteador.get('/produtos', new ProdutoController().index); 
Roteador.get('/produtos/:id', new ProdutoController().show); 
Roteador.post('/produtos', new ProdutoController().store); 
Roteador.put('/produtos/:id', new ProdutoController().update); 
Roteador.delete('/produtos/:id', new ProdutoController().delete);

Roteador.get('/disciplina', new DisciplinaController().index); 
Roteador.get('/disciplina/:id', new DisciplinaController().show); 
Roteador.post('/disciplina', new DisciplinaController().store); 
Roteador.put('/disciplina/:id', new DisciplinaController().update); 
Roteador.delete('/disciplina/:id', new DisciplinaController().delete);

Roteador.get('/professor', new ProfessorController().index); 
Roteador.get('/professor/:id', new ProfessorController().show); 
Roteador.post('/professor', new ProfessorController().store); 
Roteador.put('/professor/:id', new ProfessorController().update); 
Roteador.delete('/professor/:id', new ProfessorController().delete);

Roteador.get('/salaAula', new SalaAulaController().index); 
Roteador.get('/salaAula/:id', new SalaAulaController().show); 
Roteador.post('/salaAula', new SalaAulaController().store); 
Roteador.put('/salaAula/:id', new SalaAulaController().update); 
Roteador.delete('/salaAula/:id', new SalaAulaController().delete);

Roteador.get('/curso', new CursoController().index); 
Roteador.get('/curso/:id', new CursoController().show); 
Roteador.post('/curso', new CursoController().store); 
Roteador.put('/curso/:id', new CursoController().update); 
Roteador.delete('/curso/:id', new CursoController().delete);

export default Roteador;