import express from 'express';
import { placeOrder, getOrdersByUserId } from '../controllers/orderController';

const router = express.Router();
// Place a new order
router.post('/', placeOrder);

// Get orders by user ID
router.get('/user/:userId', getOrdersByUserId);

module.exports = router;
