import express, { Express } from 'express';
import HttpError from './utils/httpError.js';
import globalErrorHandler from './api/v1/handlers/errorHandler.js';
import authRouterV1 from './api/v1/routes/authRoutes.js';
import quizRouterV1 from './api/v1/routes/quizRoutes.js';
import questionRouterV1 from './api/v1/routes/questionRoutes.js';
import userRouterV1 from './api/v1/routes/userRoutes.js';

const app: Express = express();

app.use(express.json());

// Routes

// V1
app.use('/api/v1/auth', authRouterV1);
app.use('/api/v1/quiz', quizRouterV1);
app.use('/api/v1/question', questionRouterV1);
app.use('/api/v1/users', userRouterV1);

app.all('*', function (req, res, next) {
  return next(
    new HttpError(`This route is not defined: ${req.originalUrl}`, 404)
  );
});

app.use(globalErrorHandler);

export default app;
