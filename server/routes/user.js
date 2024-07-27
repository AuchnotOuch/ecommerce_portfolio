import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

const router = Router();
// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

export default router;
