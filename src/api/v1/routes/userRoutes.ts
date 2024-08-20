import { Router } from 'express';
import UserController from '../controllers/userController.js';
import ProtectMiddlewares from '../middlewares/protectMiddlewares.js';
import checkID from '../middlewares/checkIdMiddleware.js';

const router = Router();

const { getAllDocuments, getDocumentById, deleteDocument, updateDocument } =
  new UserController();
const { protect, restrictTo, protectCurrentUser } = new ProtectMiddlewares();

router.use(protect);
router.param('id', checkID);
router.route('/').get(restrictTo('admin'), getAllDocuments);
router
  .route('/:id')
  .get(restrictTo('admin', 'teacher'), getDocumentById)
  .delete(restrictTo('admin'), protectCurrentUser, deleteDocument)
  .patch(restrictTo('admin'), updateDocument);

export default router;
