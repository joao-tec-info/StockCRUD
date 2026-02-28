const pool = require('../config/db');

// Listar movimentações (todos autenticados podem ver)
async function listarMovimentacoes(req, res) {
  try {
    const result = await pool.query(
      `SELECT m.*, i.nome as item_nome, u.usuario as usuario_nome, so.nome as setor_origem_nome, sd.nome as setor_destino_nome
       FROM movimentacoes m
       LEFT JOIN itens i ON i.id = m.item_id
       LEFT JOIN usuarios u ON u.id = m.usuario_id
       LEFT JOIN setores so ON so.id = m.setor_origem
       LEFT JOIN setores sd ON sd.id = m.setor_destino
       ORDER BY m.data_hora DESC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar movimentações:', err);
    return res.status(500).json({ error: 'Erro ao listar movimentações' });
  }
}

// Criar movimentação
async function criarMovimentacao(req, res) {
  try {
    const { item_id, tipo, quantidade, setor_origem, setor_destino } = req.body;
    const usuario_id = req.user?.id;

    if (!item_id || !tipo || !quantidade || !usuario_id) {
      return res.status(400).json({ error: 'item_id, tipo, quantidade são obrigatórios' });
    }

    if (quantidade <= 0) {
      return res.status(400).json({ error: 'Quantidade deve ser maior que zero' });
    }

    // Ajusta quantidade no item conforme tipo
    const itemRes = await pool.query('SELECT * FROM itens WHERE id = $1', [item_id]);
    if (itemRes.rowCount === 0) return res.status(404).json({ error: 'Item não encontrado' });
    const item = itemRes.rows[0];

    if (tipo === 'entrada') {
      const newQty = Number(item.quantidade) + Number(quantidade);
      await pool.query('UPDATE itens SET quantidade = $1 WHERE id = $2', [newQty, item_id]);
    } else if (tipo === 'saida') {
      const newQty = Number(item.quantidade) - Number(quantidade);
      if (newQty < 0) return res.status(400).json({ error: 'Quantidade insuficiente para saída' });
      await pool.query('UPDATE itens SET quantidade = $1 WHERE id = $2', [newQty, item_id]);
    } else if (tipo === 'transferencia') {
      // atualiza setor do item para setor_destino
      await pool.query('UPDATE itens SET setor_id = $1 WHERE id = $2', [setor_destino, item_id]);
    }

    const result = await pool.query(
      `INSERT INTO movimentacoes (item_id, tipo, quantidade, usuario_id, setor_origem, setor_destino)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [item_id, tipo, quantidade, usuario_id, setor_origem || null, setor_destino || null]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar movimentação:', err);
    return res.status(500).json({ error: 'Erro ao criar movimentação' });
  }
}

module.exports = {
  listarMovimentacoes,
  criarMovimentacao
};
