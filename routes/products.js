const express = require('express');
const router = express.Router();
const productController = require('../controller/products.controller');

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Obtener todos los productos con paginación y filtros
router.get('/', productController.getAllProducts);

// Obtener un producto por ID
router.get('/:pid', productController.getProductById);

// Eliminar un producto por ID
router.delete('/:pid', productController.deleteProductById);

module.exports = router;






