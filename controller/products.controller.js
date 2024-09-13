const productDAO = require('../models/products');

const createProduct = async (req, res) => {
  try {
    const product = await productDAO.create(req.body);
    res.status(201).json({ status: 'success', payload: product });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  const { limit = 10, page = 1, sort = 'asc', query = '' } = req.query;
  try {
    const result = await productDAO.findAll({ limit, page, sort, query });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productDAO.findById(req.params.pid);
    if (product) {
      res.status(200).json({ status: 'success', payload: product });
    } else {
      res.status(404).json({ status: 'error', message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const success = await productDAO.deleteProduct(req.params.pid);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ status: 'error', message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
};
