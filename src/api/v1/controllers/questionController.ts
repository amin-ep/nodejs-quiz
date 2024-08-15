import { ZodError } from 'zod';
import catchAsync from '../../../utils/catchAsync.js';
import { IRequest } from '../interfaces/IRequest.js';
import { Response, NextFunction } from 'express';
import HttpError from '../../../utils/httpError.js';
import {
  createQuestionValidator,
  updateQuestionValidator,
} from '../validators/questionValidator.js';
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

  getQuestionById = catchAsync(async (req: IRequest, res: Response) => {
    const question = await Question.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        question,
      },
    });
  });

  updateQuestion = catchAsync(
    async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        updateQuestionValidator.parse(req.body);
      } catch (err) {
        if (err instanceof ZodError) {
          return next(new HttpError(err.errors[0].message, 400));
        }
      }

      const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          returnOriginal: false,
        }
      );

      if (!updatedQuestion) {
        return next(new HttpError(`Invalid Id: ${req.params.id}`, 404));
      }

      res.status(200).json({
        status: 'success',
        data: {
          question: updatedQuestion,
        },
      });
    }
  );

  deleteQuestion = catchAsync(
    async (req: IRequest, res: Response, next: NextFunction) => {
      const question = await Question.findByIdAndDelete(req.params.id);

      if (!question) {
        return next(new HttpError(`Invalid Id: ${req.params.id}`, 404));
      }

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
}

export default QuestionController;
