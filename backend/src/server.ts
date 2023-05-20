// importa o express 
import express from 'express';
// importar rotas 
import Roteador from './routes';
// instancia o express 
const app = express();
// Configurar uso json
app.use(express.json());
// Configuração de uso das rotas
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
app.use(Roteador); 
//configura porta e funçao executada na ativação 
app.listen(4000, ()=>{console.log("Servidor Iniciado")}  );
