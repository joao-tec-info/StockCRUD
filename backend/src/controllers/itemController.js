const pool = require('../config/db');

// Listar todos
async function listarItens(req, res) {
  try {
    const result = await pool.query('SELECT * FROM itens ORDER BY id');
    return res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar itens:', err);
    return res.status(500).json({ error: 'Erro ao listar itens' });
  }
}

// Buscar um item por ID
async function buscarItemPorId(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM itens WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar item:', err);
    return res.status(500).json({ error: 'Erro ao buscar item' });
  }
}

// Criar novo item
async function criarItem(req, res) {
  try {
    const { nome, quantidade, preco, minimo } = req.body;

    if (!nome || quantidade === undefined || preco === undefined || minimo === undefined) {
      return res.status(400).json({ error: 'Nome, quantidade, preço e mínimo são obrigatórios' });
    }

    if (quantidade < 0 || preco < 0 || minimo < 0) {
      return res.status(400).json({ error: 'Quantidade, preço e mínimo não podem ser negativos' });
    }

    const result = await pool.query(
      'INSERT INTO itens (nome, quantidade, preco, minimo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, quantidade, preco, minimo]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar item:', err);
    return res.status(500).json({ error: 'Erro ao criar item' });
  }
}

// Atualizar item
async function atualizarItem(req, res) {
  try {
    const { id } = req.params;
    const { nome, quantidade, preco, minimo } = req.body;

    if (!nome && quantidade === undefined && preco === undefined && minimo === undefined) {
      return res.status(400).json({ error: 'Informe pelo menos um campo para atualizar' });
    }

    const result = await pool.query(
      `UPDATE itens 
       SET nome = COALESCE($1, nome),
           quantidade = COALESCE($2, quantidade),
           preco = COALESCE($3, preco),
           minimo = COALESCE($4, minimo),
           criado_em = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [nome, quantidade, preco, minimo, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar item:', err);
    return res.status(500).json({ error: 'Erro ao atualizar item' });
  }
}

// Remover item
async function removerItem(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM itens WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    return res.json({ message: 'Item removido com sucesso', item: result.rows[0] });
  } catch (err) {
    console.error('Erro ao remover item:', err);
    return res.status(500).json({ error: 'Erro ao remover item' });
  }
}

module.exports = {
  listarItens,
  buscarItemPorId,
  criarItem,
  atualizarItem,
  removerItem
};