import { Router } from 'express';
import { addProduct, getProducts, getProductById } from '../controllers/productController.js';

const router = Router();
// Add a new product
router.post('/', addProduct);

// Get all products
router.get('/', getProducts);

// Get product by ID
router.get('/:id', getProductById);

export default router;
