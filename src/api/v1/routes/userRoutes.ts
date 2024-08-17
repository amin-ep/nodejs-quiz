import { Router } from 'express';
import UserController from '../controllers/userController.js';
import ProtectMiddlewares from '../middlewares/protectMiddlewares.js';

const router = Router();

const { getAllUsers, getUserById } = new UserController();
const { protect, restrictTo } = new ProtectMiddlewares();

router.use(protect);

router.route('/').get(restrictTo('admin'), getAllUsers);
router.route('/:id').get(restrictTo('admin', 'teacher'), getUserById);

export default router;
