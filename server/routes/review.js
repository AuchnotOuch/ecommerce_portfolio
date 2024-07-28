import express from 'express';
import { addReview } from '../controllers/reviewController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Add a review to a product
router.post('/:productId', auth, addReview);

export default router;
