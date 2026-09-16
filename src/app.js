import express from 'express';
import cors from 'cors';
import agendamentosRoutes from './routes/agendamentos.js';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(agendamentosRoutes);

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});