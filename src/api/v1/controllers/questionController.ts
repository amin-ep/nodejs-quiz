// import { ZodError } from 'zod';
// import catchAsync from '../../../utils/catchAsync.js';
// import { IRequest } from '../interfaces/IRequest.js';
// import { Response, NextFunction } from 'express';
// import HttpError from '../../../utils/httpError.js';
// import {
//   createQuestionValidator,
//   updateQuestionValidator,
// } from '../validators/questionValidator.js';
import Question from '../models/Question.js';
import Factory from '../handlers/handlerFactory.js';
import { IQuestion } from '../interfaces/IQuestion.js';

class QuestionController extends Factory<IQuestion> {
  constructor() {
    super(Question);
  }
}

export default QuestionController;
