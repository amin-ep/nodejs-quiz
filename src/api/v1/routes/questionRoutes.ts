import { Router } from 'express';
import QuestionController from '../controllers/questionController.js';
import ProtectMiddlewares from '../middlewares/protectMiddlewares.js';
import checkID from '../middlewares/checkIdMiddleware.js';
import { addOwnerMiddleware } from '../middlewares/addOwnerMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import {
  createQuestionValidator,
  updateQuestionValidator,
} from '../validators/questionValidator.js';
import addQuizId from '../middlewares/addQuizIdMiddleware.js';
const router = Router();

const {
  getAllDocuments,
  createDocument,
  deleteDocument,
  getDocumentById,
  updateDocument,
} = new QuestionController();

const { protect, restrictTo } = new ProtectMiddlewares();

router.use(protect);
router.param('id', checkID);
router
  .route('/')
  .post(
    restrictTo('teacher'),
    addQuizId,
    addOwnerMiddleware,
    validationMiddleware(createQuestionValidator),
    createDocument
  )
  .get(getAllDocuments);

router
  .route('/:id')
  .get(getDocumentById)
  .delete(restrictTo('admin', 'teacher'), deleteDocument)
  .patch(
    restrictTo('admin', 'teacher'),
    validationMiddleware(updateQuestionValidator),
    updateDocument
  );

export default router;
