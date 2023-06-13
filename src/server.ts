import express from 'express';
import Roteador from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(Roteador);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado na porta ${process.env.PORT}`);
});
