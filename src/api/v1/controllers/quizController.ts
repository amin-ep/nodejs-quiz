import Quiz from '../models/Quiz.js';
import Factory from '../handlers/handlerFactory.js';
import { IQuiz } from '../interfaces/IQuiz.js';
import catchAsync from '../../../utils/catchAsync.js';
import { IRequest } from '../interfaces/IRequest.js';
import { Response } from 'express';

export default class QuizController extends Factory<IQuiz> {
  constructor() {
    super(Quiz);
  }

  getMyQuizzes = catchAsync(async (req: IRequest, res: Response) => {
    const quizzes = await Quiz.find({ teacherId: req.user?.id });

    res.status(200).json({
      status: 'success',
      result: quizzes.length,
      data: {
        quizzes,
      },
    });
  });
}
