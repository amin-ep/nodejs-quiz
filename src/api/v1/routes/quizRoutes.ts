import { Router } from 'express';
import QuizController from '../controllers/quizController.js';
import ProtectMiddlewares from '../middlewares/protectMiddlewares.js';
// import questionRouter from './questionRoutes.js';

const router = Router();

const { getAllQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz } =
  new QuizController();
const { protect, restrictTo } = new ProtectMiddlewares();

// router.use('/:quizId/question', questionRouter);

router.use(protect);
router.route('/').get(getAllQuizzes).post(restrictTo('teacher'), createQuiz);
router
  .route('/:id')
  .get(getQuizById)
  .patch(restrictTo('teacher', 'admin'), updateQuiz)
  .delete(restrictTo('admin', 'teacher'), deleteQuiz);

export default router;
