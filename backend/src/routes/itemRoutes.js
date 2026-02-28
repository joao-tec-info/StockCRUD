const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const { listarItens, criarItem, atualizarItem, removerItem } = require('../controllers/itemController');

// Todas as rotas precisam de autenticação
router.use(auth);

// Listar e buscar: todos autenticados (admin, estoquista, consulta)
router.get('/', authorize('admin', 'estoquista', 'consulta'), listarItens);

// Criar e atualizar: admin e estoquista
router.post('/', authorize('admin', 'estoquista'), criarItem);
router.put('/:id', authorize('admin', 'estoquista'), atualizarItem);

// Deletar: apenas admin
router.delete('/:id', authorize('admin'), removerItem);


module.exports = router;