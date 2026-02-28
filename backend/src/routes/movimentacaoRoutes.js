const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const { listarMovimentacoes, criarMovimentacao } = require('../controllers/movimentacaoController');

router.use(auth);

router.get('/', authorize('admin','estoquista','consulta'), listarMovimentacoes);
router.post('/', authorize('admin','estoquista'), criarMovimentacao);

module.exports = router;
