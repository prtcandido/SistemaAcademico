// Importa componentes do express 
import {Router} from 'express'; 
// Importa TesteController 
import TesteController from './controllers/TesteController'; 
// Importar ProdutoController
import ProdutoController from './controllers/ProdutoController'; 
// Validação dos parâmetos da rota 
import ValidaTeste1 from './middlewares/ValidaTeste1';
import { TurmaController } from './controllers/TurmaController';
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

Roteador.post('/turma/', new TurmaController().create);
Roteador.put('/turma/:id', new TurmaController().update);
Roteador.delete('/turma/:id', new TurmaController().delete);
Roteador.delete('/turma/desatribuirAluno/:id', new TurmaController().removerAluno);
Roteador.post('/turma/atribuirAluno/:id', new TurmaController().atribuirAluno);

export default Roteador;