import express from 'express';
import mysql from 'mysql2/promise';
import dbConfig from '../config/database.js';

const router = express.Router();

// POST - Salvar agendamento
router.post('/agendamentos', async (req, res) => {
  const { nome, procedimento, dia, hora } = req.body;

  // Verifica se todos os dados foram enviados
  if (!nome || !procedimento || !dia || !hora) {
    return res.status(400).json({
      message: 'Nome, procedimento, dia e hora são obrigatórios.'
    });
  }

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    console.log('Conectado ao banco MySQL');

    const insertQuery = `
      INSERT INTO agendamento (nome, procedimento, dia, hora)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [
      nome,
      procedimento,
      dia,
      hora
    ]);

    console.log(`Agendamento salvo com sucesso! ID: ${result.insertId}`);

    const mensagem = `Olá ${nome}, aguardamos você para realizar o seu procedimento ${procedimento} no dia ${dia} às ${hora} horas.`;

    res.status(201).json({
      message: mensagem,
      id: result.insertId
    });

  } catch (err) {
    console.error('Erro ao processar o agendamento:', err);

    res.status(500).json({
      message: 'Erro interno ao salvar o agendamento'
    });

  } finally {
    if (connection) {
      await connection.end();
    }
  }
});


// GET - Buscar todos os agendamentos
router.get('/agendamentos', async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT * FROM agendamento'
    );

    res.status(200).json(rows);

  } catch (err) {
    console.error('Erro ao buscar agendamentos:', err);

    res.status(500).json({
      message: 'Erro ao buscar agendamentos'
    });

  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

export default router;
