require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Teste de conexão (opcional, mas muito útil no começo)
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar no banco:', err.stack);
  }
  console.log('Conectado ao PostgreSQL com sucesso!');
  release();
});

module.exports = pool;