// Importa componentes do express 
import {Router} from 'express'; 
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
// Importar MaterialDidaticoController
import MaterialDidaticoController from './controllers/MaterialDidaticoController'; 
// Validação dos parâmetos da rota 
import ValidaTeste1 from './middlewares/ValidaTeste1';
// Instancia roteador 
const Roteador = Router(); 
// Define rota tipo get que, para funcionar, deve ser requisitada conforme exemplo. 

Roteador.get('/materialdidatico', new MaterialDidaticoController().index); 
Roteador.get('/materialdidatico/:id', new MaterialDidaticoController().show); 
Roteador.post('/materialdidatico', upload.single('arquivo'), new MaterialDidaticoController().store); 
Roteador.put('/materialdidatico/:id', new MaterialDidaticoController().update); 
Roteador.delete('/materialdidatico/:id', new MaterialDidaticoController().delete);

export default Roteador;