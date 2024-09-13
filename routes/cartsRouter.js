const express = require('express');
const router = express.Router();
const cartsController = require('../controller/carts.controller');

// Crear un nuevo carrito
router.post('/', cartsController.createCart);

// Agregar producto al carrito
router.post('/:cid/products/:pid', cartsController.addProductToCart);

// Obtener todos los carritos
router.get('/', cartsController.getAllCarts);

// Obtener un carrito por ID
router.get('/:cid', cartsController.getCartById);

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', cartsController.updateProductQuantityInCart);

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', cartsController.removeProductFromCart);

// Eliminar todos los productos del carrito
router.delete('/:cid', cartsController.clearCart);

module.exports = router;





