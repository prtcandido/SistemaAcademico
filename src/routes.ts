// Importa componentes do express
import { Router } from 'express';
import { AulaController } from './controllers/AulaController';
import { HealthController } from './controllers/HealthController';
import { TurmaController } from './controllers/TurmaController';

const Roteador = Router();

Roteador.get('/aulas', new AulaController().index);
Roteador.get('/aulas/:id', new AulaController().show);
Roteador.post('/aulas', new AulaController().store);
Roteador.put('/aulas/:id', new AulaController().update);
Roteador.delete('/aulas/:id', new AulaController().delete);

Roteador.get(
  '/turmas/:id/class-planning-report',
  new TurmaController().generateClassPlanningReport
);
Roteador.get('/turmas/:id/aulas', new TurmaController().getClasses);

Roteador.get('/health', new HealthController().index);

export default Roteador;
