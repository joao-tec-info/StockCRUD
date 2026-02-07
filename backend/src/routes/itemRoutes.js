const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.listarItens);
router.get('/:id', itemController.buscarItemPorId);
router.post('/', itemController.criarItem);
router.put('/:id', itemController.atualizarItem);
router.delete('/:id', itemController.removerItem);

module.exports = router;