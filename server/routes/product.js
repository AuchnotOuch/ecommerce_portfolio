import express from 'express';
import auth from '../middleware/auth.js';
import { addProduct, getProducts, getProductById, getRelatedProducts, getCategories } from '../controllers/productController.js';

const router = express.Router();

// Add a new product
router.post('/', addProduct);
// Get related products
router.get('/related', getRelatedProducts);
// Get categories
router.get('/categories', getCategories);
// Get product by ID
router.get('/:id', getProductById);
// Get all products
router.get('/', getProducts);


export default router;
