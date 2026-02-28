module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.perfil) {
      return res.status(403).json({ error: 'Acesso negado: usuário não autenticado corretamente' });
    }

    if (!allowedRoles.includes(req.user.perfil)) {
      return res.status(403).json({ error: 'Você não tem permissão para esta ação' });
    }

    next();
  };
};