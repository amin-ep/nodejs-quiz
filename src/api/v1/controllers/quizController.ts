import { NextFunction, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import Quiz from '../models/Quiz.js';
import { IRequest } from '../interfaces/IRequest.js';
import { createQuizValidator } from '../validators/quizValidator.js';
import HttpError from '../../../utils/httpError.js';
import { ZodError } from 'zod';

class QuizController {
  getAllQuizzes = catchAsync(async (_req: IRequest, res: Response) => {
    const quiz = await Quiz.find();

    res.status(200).json({
      status: 'success',
      data: {
        quiz,
      },
    });
  });

  getQuizById = catchAsync(async (req: IRequest, res: Response) => {
    const quiz = await Quiz.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        quiz,
      },
    });
  });

  createQuiz = catchAsync(
    async (req: IRequest, res: Response, next: NextFunction) => {
      if (!req.body.teacherID) req.body.teacherID = req.user?.id;
      try {
        createQuizValidator.parse(req.body);
      } catch (err) {
        if (err instanceof ZodError) {
          return next(new HttpError(err.errors[0].message, 400));
        }
      }

      const newQuiz = await Quiz.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          quiz: newQuiz,
        },
      });
    }
  );
}

export default QuizController;
