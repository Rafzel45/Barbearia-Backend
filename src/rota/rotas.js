import express from 'express';
import mysql from 'mysql2/promise';
import dbConfig from '../config/database.js';

const router = express.Router();

router.post('/salvar-agendamento', async (req, res) => {
  const { nome, procedimento, dia, hora } = req.body;

  let connection;
  try { 
    connection = await mysql.createConnection(dbConfig);
    console.log('Conectado ao banco MySql');

    const insertQuerry = `
      INSERT INTO agendamento (nome, procedimento, dia, hora)
      VALUES (?, ?, ?, ?);
    `;

    const [result] = await connection.execute(insertQuerry, [nome, procedimento, dia, hora]);

    console.log(`Agendamento salvo com sucesso! ID: ${result.insertId}`);

    const mensagem = `Ola ${nome},
    aguardamos voce para realizar o seu procedimento ${procedimento} no dia ${dia} as ${hora} horas.`;

    res.status(200).send({ message: mensagem });
    
  } catch (err) {
    console.error('Erro ao processar o agendamento', err);
    res.status(500).send({ message: 'Erro interno ao salvar o agendamento' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});


router.get('/agendamentos', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM agendamento');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao buscar agendamentos', err);
    res.status(500).send({ message: 'Erro ao buscar agendamentos' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

export default router;