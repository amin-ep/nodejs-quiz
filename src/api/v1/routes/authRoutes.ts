import { Router } from 'express';
import AuthController from '../controllers/authController.js';

const router = Router();
const { signup, verifyEmail, login } = new AuthController();

router.post('/signup', signup);
router.post('/verifyEmail/:code', verifyEmail);
router.post('/login', login);
export default router;
