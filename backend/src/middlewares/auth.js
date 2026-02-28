const jwt = require('jsonwebtoken');

// Chave secreta (use .env em)
const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-super-forte-1234567890abcdef';

module.exports = (req, res, next) => {
  // Pega o token do header Authorization: Bearer <token>
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('[auth] Token não fornecido para', req.method, req.originalUrl);
    return res.status(401).json({ erro: 'Token não fornecido. Faça login novamente.' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET);

    console.log('[auth] Token verificado:', { id: decoded.id, usuario: decoded.usuario, perfil: decoded.perfil });

    // Salva os dados do usuário na requisição (para usar em controllers)
    req.user = decoded; // { id, usuario, perfil }

    next(); // continua para a rota
  } catch (err) {
    console.log('[auth] Token inválido/expirado para', req.method, req.originalUrl, err.message);
    return res.status(401).json({ erro: 'Token inválido ou expirado. Faça login novamente.' });
  }
};