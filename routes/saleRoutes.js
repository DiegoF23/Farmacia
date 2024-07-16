const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

router.get('/ventas',saleController.getAllSales);
router.get('/venta/:id',saleController.getSaleById);
router.post('/venta',saleController.createSale);

module.exports= router;
