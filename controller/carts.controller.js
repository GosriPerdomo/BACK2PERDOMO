const cartDao = require('../dao/cart.dao');

// Crear un nuevo carrito
const createCart = async (req, res) => {
  try {
    const result = await cartDao.create();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error creating cart', details: error.message });
  }
};

// Agregar producto al carrito
const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const result = await cartDao.addProduct(cid, pid, quantity);
    if (result.status === 'success') {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error adding product to cart', details: error.message });
  }
};

// Obtener todos los carritos
const getAllCarts = async (req, res) => {
  try {
    const result = await cartDao.findAll();
    res.status(200).json({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error retrieving carts', details: error.message });
  }
};

// Obtener un carrito por ID
const getCartById = async (req, res) => {
  const { cid } = req.params;

  try {
    const result = await cartDao.findById(cid);
    if (result) {
      res.status(200).json({ status: 'success', payload: result });
    } else {
      res.status(404).json({ status: 'error', message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error retrieving cart', details: error.message });
  }
};

// Actualizar la cantidad de un producto en el carrito
const updateProductQuantityInCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const result = await cartDao.updateProductQuantity(cid, pid, quantity);
    if (result.status === 'success') {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error updating product quantity', details: error.message });
  }
};

// Eliminar un producto del carrito
const removeProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const result = await cartDao.removeProduct(cid, pid);
    if (result) {
      res.status(200).json({ status: 'success', message: 'Product removed from cart' });
    } else {
      res.status(404).json({ status: 'error', message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error removing product from cart', details: error.message });
  }
};

// Eliminar todos los productos del carrito
const clearCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const result = await cartDao.clear(cid);
    if (result) {
      res.status(200).json({ status: 'success', message: 'Cart cleared' });
    } else {
      res.status(404).json({ status: 'error', message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error clearing cart', details: error.message });
  }
};

module.exports = {
  createCart,
  addProductToCart,
  getAllCarts,
  getCartById,
  updateProductQuantityInCart,
  removeProductFromCart,
  clearCart
};
