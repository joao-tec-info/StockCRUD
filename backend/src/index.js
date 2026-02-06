const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/teste', async (req, res) => {                                                                                 
  try {
    const result = await pool.query('SELECT NOW() as agora');
    res.json({ mensagem: "Backend funcionando!", horaDoBanco: result.rows[0].agora });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no banco" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});