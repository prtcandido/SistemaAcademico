// Importa componentes do express 
import {Router} from 'express'; 
// Importa TesteController 
import TesteController from './controllers/TesteController'; 
// Importar ProdutoController
import ProdutoController from './controllers/ProdutoController'; 
import SolicitacaoController from './controllers/SolicitacaoController';
// Validação dos parâmetos da rota 
import ValidaTeste1 from './middlewares/ValidaTeste1';

import ValidaSolicitacaoId from './middlewares/ValidaSolicitacao';

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

// Roteador.get('/produtos', new ProdutoController().index); 
// Roteador.get('/produtos/:id', new ProdutoController().show); 
// Roteador.post('/produtos', new ProdutoController().store); 
// Roteador.put('/produtos/:id', new ProdutoController().update); 
// Roteador.delete('/produtos/:id', new ProdutoController().delete);

// Solicitacao
Roteador.get('/solicitacao/index', new SolicitacaoController().index)
Roteador.get('/solicitacao/{id}', ValidaSolicitacaoId, new SolicitacaoController().show)
Roteador.get('/solicitacao/{alunoId}', ValidaSolicitacaoId, new SolicitacaoController().listByAlunoId)
Roteador.post('/solicitacao', new SolicitacaoController().store)
Roteador.put('/solicitacao/{id}', ValidaSolicitacaoId, new SolicitacaoController().update)
Roteador.delete('/solicitacao/{id}', ValidaSolicitacaoId, new SolicitacaoController().delete)

// Solicitacao
Roteador.get('/solicitacao/index', new SolicitacaoController().index)
Roteador.get('/solicitacao/{id}', ValidaSolicitacaoId, new SolicitacaoController().show)
Roteador.get('/solicitacao/{alunoId}', ValidaSolicitacaoId, new SolicitacaoController().listByAlunoId)
Roteador.post('/solicitacao', new SolicitacaoController().store)
Roteador.put('/solicitacao/{id}', ValidaSolicitacaoId, new SolicitacaoController().update)
Roteador.delete('/solicitacao/{id}', ValidaSolicitacaoId, new SolicitacaoController().delete)

export default Roteador;