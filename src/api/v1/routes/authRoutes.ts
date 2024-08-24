import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import {
  forgetPasswordValidator,
  resetPasswordValidator,
} from '../validators/authValidator.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';

const router = Router();
const { signup, verifyEmail, login, forgetPassword, resetPassword } =
  new AuthController();

router.post('/signup', signup);
router.post('/verifyEmail/:code', verifyEmail);
router.post('/login', login);
router.post(
  '/forgetPassword',
  validationMiddleware(forgetPasswordValidator),
  forgetPassword
);

router.patch(
  '/resetPassword/:code',
  validationMiddleware(resetPasswordValidator),
  resetPassword
);
export default router;
