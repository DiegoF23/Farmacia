const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/productos', productController.getAllProducts);
router.get('/producto/:id', productController.getProductByID);
router.post('/productos',productController.createProduct);
router.put('/producto/:id', productController.updateProduct);
router.delete('/producto/:id', productController.deleteProduct);



module.exports= router;