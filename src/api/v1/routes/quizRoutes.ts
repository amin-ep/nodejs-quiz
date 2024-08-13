import { Router } from 'express';
import QuizController from '../controllers/quizController.js';
import { protect } from '../middlewares/protectMiddleware.js';

const router = Router();

const quiz = new QuizController();

const { getAllQuizzes, getQuizById, createQuiz } = quiz;

router.use(protect);
router.route('/').get(getAllQuizzes).post(createQuiz);
router.route('/:id').get(getQuizById);

export default router;
