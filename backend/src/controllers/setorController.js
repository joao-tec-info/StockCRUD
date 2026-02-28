const pool = require('../config/db');

async function listarSetores(req, res) {
  try {
    const result = await pool.query('SELECT * FROM setores ORDER BY nome');
    return res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar setores:', err);
    return res.status(500).json({ error: 'Erro ao listar setores' });
  }
}

async function criarSetor(req, res) {
  try {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });
    const result = await pool.query('INSERT INTO setores (nome) VALUES ($1) RETURNING *', [nome]);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar setor:', err);
    return res.status(500).json({ error: 'Erro ao criar setor' });
  }
}

async function deletarSetor(req, res) {
  try {
    const { id } = req.params;
    // verificar existência
    const exist = await pool.query('SELECT * FROM setores WHERE id = $1', [id]);
    if (exist.rowCount === 0) return res.status(404).json({ error: 'Setor não encontrado' });

    // desvincular itens que referenciam esse setor
    await pool.query('UPDATE itens SET setor_id = NULL WHERE setor_id = $1', [id]);

    // deletar setor
    await pool.query('DELETE FROM setores WHERE id = $1', [id]);
    return res.json({ success: true });
  } catch (err) {
    console.error('Erro ao deletar setor:', err);
    return res.status(500).json({ error: 'Erro ao deletar setor' });
  }
}

module.exports = { listarSetores, criarSetor };
