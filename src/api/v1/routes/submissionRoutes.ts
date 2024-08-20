import { Router } from 'express';
import SubmissionController from '../controllers/submissionController.js';
import ProtectMiddlewares from '../middlewares/protectMiddlewares.js';
import { addOwnerMiddleware } from '../middlewares/addOwnerMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { createSubmissionValidator } from '../validators/submissionValidator.js';

const router = Router();

const { getAllDocuments, createSubmission } = new SubmissionController();
const { protect, restrictTo } = new ProtectMiddlewares();

router.use(protect);
router
  .route('/')
  .get(getAllDocuments)
  .post(
    restrictTo('student'),
    addOwnerMiddleware,
    validationMiddleware(createSubmissionValidator),
    createSubmission
  );

export default router;
