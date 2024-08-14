import { Router } from 'express';
import QuestionController from '../controllers/questionController.js';

const router = Router();

const { createQuestion, getAllQuestions } = new QuestionController();

router.route('/').post(createQuestion).get(getAllQuestions);

export default router;
