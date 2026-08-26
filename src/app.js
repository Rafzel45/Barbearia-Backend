
import express from 'express';
import cors from 'cors';
import agendamentosRoutes from './rota/rotas.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/', agendamentosRoutes);

app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});