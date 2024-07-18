const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/pedidos',pedidosController.getAllPedidos);
router.get('/pedido/:id',pedidosController.getPedidosById);
router.post('/pedido',pedidosController.createPedido);
router.put('/pedido/:id',pedidosController.updatePedido);
router.delete('/pedido/:id',pedidosController.deletePedido);

module.exports = router;