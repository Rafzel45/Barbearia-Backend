import express from 'express';
import agendamentoRoutes from './routes/agendamento.js';

const app = express();

app.use(express.json());

app.use('/', agendamentoRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
