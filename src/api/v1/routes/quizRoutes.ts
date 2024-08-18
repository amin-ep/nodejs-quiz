import { Router } from 'express';
import QuizController from '../controllers/quizController.js';
import ProtectMiddlewares from '../middlewares/protectMiddlewares.js';
import checkID from '../middlewares/checkIdMiddleware.js';
import { addOwnerMiddleware } from '../middlewares/addOwnerMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import {
  createQuizValidator,
  updateQuizValidator,
} from '../validators/quizValidator.js';
const router = Router();

const {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getMyQuizzes,
} = new QuizController();

const { protect, restrictTo } = new ProtectMiddlewares();

router.use(protect);
router.get('/myQuizzes', restrictTo('teacher'), getMyQuizzes);
router.param('id', checkID);
router
  .route('/')
  .get(getAllDocuments)
  .post(
    restrictTo('teacher'),
    addOwnerMiddleware,
    validationMiddleware(createQuizValidator),
    createDocument
  );
router
  .route('/:id')
  .get(getDocumentById)
  .patch(
    restrictTo('teacher', 'admin'),
    validationMiddleware(updateQuizValidator),
    updateDocument
  )
  .delete(restrictTo('admin', 'teacher'), deleteDocument);

export default router;
