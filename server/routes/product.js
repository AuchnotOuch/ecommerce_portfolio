import express from 'express';
import auth from '../middleware/auth.js';
import { addProduct, getProducts, getProductById, getRelatedProducts } from '../controllers/productController.js';

const router = express.Router();

// Add a new product
router.post('/', addProduct);
// Get related products
router.get('/related', getRelatedProducts);
// Get product by ID
router.get('/:id', getProductById);
// Get all products
router.get('/', getProducts);


export default router;
