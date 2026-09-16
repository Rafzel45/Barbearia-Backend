import express from 'express';
import mysql from 'mysql2/promise';
import dbConfig from '../config/database.js';

const router = express.Router();

// POST - Criar agendamento
router.post('/agendamentos', async (req, res) => {
  const { nome, procedimento, data_hora } = req.body;

  if (!nome || !procedimento || !data_hora) {
    return res.status(400).json({
      message: 'Nome, procedimento e data_hora são obrigatórios.'
    });
  }

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Conectado ao banco MySQL');

    const insertQuery = `
      INSERT INTO agendamentos (nome, procedimento, data_hora)
      VALUES (?, ?, ?)
    `;

    const [result] = await connection.execute(insertQuery, [
      nome,
      procedimento,
      data_hora
    ]);

    console.log(`Agendamento salvo com sucesso! ID: ${result.insertId}`);

    res.status(201).json({
      message: 'Agendamento salvo com sucesso!',
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

// GET - Buscar agendamentos
router.get('/agendamentos', async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      'SELECT * FROM agendamentos'
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