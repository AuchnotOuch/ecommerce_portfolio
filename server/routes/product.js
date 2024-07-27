const express = require('express');
const router = express.Router();
const { addProduct, getProducts, getProductById } = require('../controllers/productController');

// Add a new product
router.post('/', addProduct);

// Get all products
router.get('/', getProducts);

// Get product by ID
router.get('/:id', getProductById);

module.exports = router;
