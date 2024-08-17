import { Router } from 'express';
import QuizController from '../controllers/quizController.js';
import ProtectMiddlewares from '../middlewares/protectMiddlewares.js';
import checkID from '../middlewares/checkIdMiddleware.js';
import { addOwnerMiddleware } from '../middlewares/addOwnerMiddleware.js';
const router = Router();

const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getMyQuizzes,
} = new QuizController();
const { protect, restrictTo } = new ProtectMiddlewares();

router.use(protect);
router.get('/myQuizzes', restrictTo('teacher'), getMyQuizzes);
router.param('id', checkID);
router
  .route('/')
  .get(getAllQuizzes)
  .post(restrictTo('teacher'), addOwnerMiddleware, createQuiz);
router
  .route('/:id')
  .get(getQuizById)
  .patch(restrictTo('teacher', 'admin'), updateQuiz)
  .delete(restrictTo('admin', 'teacher'), deleteQuiz);

export default router;
