import { Router } from 'express';
import QuestionController from '../controllers/questionController.js';
import ProtectMiddlewares from '../middlewares/protectMiddlewares.js';
import checkID from '../middlewares/checkIdMiddleware.js';
import { addOwnerMiddleware } from '../middlewares/addOwnerMiddleware.js';
const router = Router();

const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = new QuestionController();

const { protect, restrictTo } = new ProtectMiddlewares();

router.use(protect);
router.param('id', checkID);
router
  .route('/')
  .post(restrictTo('teacher'), addOwnerMiddleware, createQuestion)
  .get(restrictTo('admin'), getAllQuestions);

router
  .route('/:id')
  .get(getQuestionById)
  .delete(restrictTo('admin', 'teacher'), deleteQuestion)
  .patch(restrictTo('admin', 'teacher'), updateQuestion);

export default router;
