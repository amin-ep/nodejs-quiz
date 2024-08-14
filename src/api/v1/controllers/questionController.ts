import { ZodError } from 'zod';
import catchAsync from '../../../utils/catchAsync.js';
import { IRequest } from '../interfaces/IRequest.js';
import { Response, NextFunction } from 'express';
import HttpError from '../../../utils/httpError.js';
import { createQuestionValidator } from '../validators/questionValidator.js';
import Question from '../models/Question.js';

class QuestionController {
  getAllQuestions = catchAsync(async (req: IRequest, res: Response) => {
    const questions = await Question.find().populate({
      path: 'quiz',
      select: 'title',
    });

    res.status(200).json({
      status: 'success',
      data: {
        question: questions,
      },
    });
  });
  createQuestion = catchAsync(
    async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        createQuestionValidator.parse(req.body);
      } catch (err) {
        if (err instanceof ZodError) {
          return next(new HttpError(err.errors[0].message, 400));
        }
      }

      const newQuestion = await Question.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          question: newQuestion,
        },
      });
    }
  );
}

export default QuestionController;
