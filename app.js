import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors'

const app = express();
const PORT = 3000;

//CONFIGURACAO DO MYSQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
}

// CONFIG DO EXPRESS
app.use(express.json());
app.use(cors());

//ROTA PARA LIDAR COM AGENDAMENTOS
app.post('/salvar-agendamento', async (req, res)=>{

    const { nome, procedimentos, dia, hora } = req.body;

    let connection;
    try { 
        connection = await mysql.createConnection(dbConfig);
        console.log('Conectado ao banco MySql');

        const insertQuerry = `
            INSERT INFO agendamento (nome, procedimento, dia, hora)
            VALUES (?,?,?,?);
            `;

            const [result] = await connection.execute(insertQuerry, [nome, procedimento, dia, hora]);

            console.log(`Agendamento salvo com sucesso! ID: ${result.insertID}`);

            const mensagem = `Ola ${nome},
            aguardamos voce para realizar o seu procedimento ${procedimento} no dia ${dia} as ${hora} horas.`;

            res.status(200).send({message: mensagem });
        
    } catch (err) {
        console.error('Erro ao processar o agendamento', err);
        res.status(500).send({  message> 'Erro interno ao salvar o agendamento'});
    }  finally{
        if(connection){
            connection.end();
        }
    }
});
