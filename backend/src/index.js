require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/itens', itemRoutes);

// Rota de teste (já funcionando)
app.get('/teste', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as agora');
    res.json({
      mensagem: "Backend funcionando!",
      horaDoBanco: result.rows[0].agora
    });
  } catch (err) {
    console.error('Erro na rota /teste:', err);
    res.status(500).json({ erro: "Erro ao consultar o banco" });
  }
});

// Rota padrão (opcional - ajuda a saber que o servidor está vivo)
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'API de Gerenciador de Estoque rodando!',
    teste: 'Tente /teste ou /api/itens'
  });
});

// Handler 404 - para rotas não encontradas (muito útil para debug)
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho: req.originalUrl,
    metodo: req.method
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});