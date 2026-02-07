const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM itens ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar itens:', err);
    res.status(500).json({ error: 'Erro interno ao listar itens' });
  }
});

module.exports = router;