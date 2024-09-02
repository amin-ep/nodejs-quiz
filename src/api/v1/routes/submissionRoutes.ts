import { Router } from 'express';
import SubmissionController from '../controllers/submissionController.js';
import ProtectMiddlewares from '../middlewares/protectMiddlewares.js';
import { addOwnerMiddleware } from '../middlewares/addOwnerMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { createSubmissionValidator } from '../validators/submissionValidator.js';
import checkID from '../middlewares/checkIdMiddleware.js';
import addQuizId from '../middlewares/addQuizIdMiddleware.js';

const router = Router({ mergeParams: true });

const { getAllDocuments, createSubmission, updateMyAnswer, getDocumentById } =
  new SubmissionController();
const { protect, restrictTo } = new ProtectMiddlewares();

router.param('id', checkID);

router.use(protect);
router
  .route('/')
  .get(getAllDocuments)
  .post(
    restrictTo('student'),
    addOwnerMiddleware,
    addQuizId,
    validationMiddleware(createSubmissionValidator),
    createSubmission
  );

router.route('/:id').get(getDocumentById);

router.param('submissionId', checkID);
router.param('answerId', checkID);

router.patch('/:submissionId/:answerId', restrictTo('student'), updateMyAnswer);
export default router;
