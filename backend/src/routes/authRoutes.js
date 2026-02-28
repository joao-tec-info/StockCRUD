const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Chave secreta do JWT (mude para uma forte e coloque em .env depois)
const JWT_SECRET = 'sua-chave-secreta-super-forte-123456789'; // temporário

// Rota de login (POST /api/auth/login)
router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  // Validação básica
  if (!usuario || !senha) {
    return res.status(400).json({ erro: 'Usuário e senha são obrigatórios' });
  }

  try {
    // Busca o usuário no banco
    const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);

    if (result.rows.length === 0) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const user = result.rows[0];

    // Verifica se a senha bate com o hash armazenado
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        usuario: user.usuario, 
        perfil: user.perfil 
      },
      JWT_SECRET,
      { expiresIn: '1h' } // expira em 1 hora
    );

    // Resposta de sucesso
    res.json({
      mensagem: 'Login realizado com sucesso',
      token: token,
      usuario: {
        id: user.id,
        usuario: user.usuario,
        perfil: user.perfil
      }
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
});

module.exports = router;