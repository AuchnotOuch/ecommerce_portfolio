import express from 'express';
import { placeOrder, getOrdersByUserId } from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Place a new order
router.post('/', auth, placeOrder);

// Get orders by user ID
router.get('/user', auth, getOrdersByUserId);

export default router;
