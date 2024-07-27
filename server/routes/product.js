import express from 'express';
import { addProduct, getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// Add a new product
router.post('/', addProduct);

// Get product by ID
router.get('/:id', getProductById);
// Get all products
router.get('/', getProducts);


export default router;
