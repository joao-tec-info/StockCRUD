const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const { listarSetores, criarSetor, deletarSetor } = require('../controllers/setorController');

router.use(auth);

router.get('/', authorize('admin','estoquista','consulta'), listarSetores);
router.post('/', authorize('admin'), criarSetor);
router.delete('/:id', authorize('admin'), deletarSetor);

module.exports = router;
