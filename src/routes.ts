// Importa componentes do express 
import {Router} from 'express'; 
// Importa TesteController 
import TesteController from './controllers/TesteController'; 
// Importar ProdutoController
import ProdutoController from './controllers/ProdutoController'; 
// Validação dos parâmetos da rota 
import ValidaTeste1 from './middlewares/ValidaTeste1';
import NotaController from './controllers/NotaController';
import ValidaNota from './middlewares/ValidaNota';

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

// Rotas '/notas'
Roteador.get('/notas', new NotaController().index);
Roteador.get('/notas/prova/:id', ValidaNota, new NotaController().getNotasByProvaId);
Roteador.get('/notas/aluno/:id', ValidaNota, new NotaController().getNotasByAlunoId);
Roteador.get('/notas/:id', ValidaNota, new NotaController().show);

Roteador.post('/notas', new NotaController().store);
Roteador.put('/notas/:id', ValidaNota, new NotaController().update);
Roteador.delete('/notas/:id', ValidaNota, new NotaController().delete);


export default Roteador;