import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';  // ES module import

const router = express.Router();

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;  // Use default export
