import catchAsync from '../../../utils/catchAsync.js';
import Factory from '../handlers/handlerFactory.js';
import { IRequest } from '../interfaces/IRequest.js';
import { ISubmission } from '../interfaces/ISubmission.js';

import Submission from '../models/Submission.js';
import { NextFunction, Response } from 'express';
import HttpError from '../../../utils/httpError.js';

export default class SubmissionController extends Factory<ISubmission> {
  constructor() {
    super(Submission);
  }

  createSubmission = catchAsync(
    async (req: IRequest, res: Response, next: NextFunction) => {
      const existingSubmission = await Submission.findOne({
        quiz: req.body.quiz,
        owner: req?.user?.id,
      });
      if (!existingSubmission) {
        const newSubmission = await Submission.create(req.body);

        res.status(201).json({
          status: 'success',
          data: {
            submission: newSubmission,
          },
        });
      } else {
        const newAnswer = req.body.answers.pop();

        const answerIndex = existingSubmission.answers.findIndex(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          el => el.question == newAnswer.question
        );
        if (answerIndex < 0) {
          existingSubmission.answers = [
            ...existingSubmission.answers,
            newAnswer,
          ];
          await existingSubmission.save({ validateBeforeSave: false });
          res.status(200).json({
            status: 'success',
            data: {
              existingSubmission,
            },
          });
        } else {
          return next(
            new HttpError('You have answered this question before', 403)
          );
        }
      }
    }
  );
}
