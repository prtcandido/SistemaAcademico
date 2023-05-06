// Importa componentes do express 
import {Router} from 'express'; 
import validarDadosItemCalendario from './middlewares/validarDadosItemCalendario';
import CalendarioAcademicoController from './controllers/CalendarioAcademico';
// Importa TesteController 

// Validação dos parâmetos da rota 
// Instancia roteador 
const Roteador = Router(); 
const calendario = new CalendarioAcademicoController()


Roteador.get('/calendario', calendario.getAll); 
Roteador.get('/calendario/:id', calendario.getItem); 
Roteador.post('/calendario', calendario.createItem, validarDadosItemCalendario); 
Roteador.put('/calendario/:id', calendario.updateItem); 
Roteador.delete('/calendario/:id', calendario.deleteItem);

export default Roteador;