import { IRequest } from '../interfaces/IRequest.js';
import { Response, NextFunction } from 'express';

export default function addQuizId(
  req: IRequest,
  _res: Response,
  next: NextFunction
) {
  if (req.params.quizId) {
    if (!req.body.quiz) req.body.quiz = req.params.quizId;
  }
  next();
}
