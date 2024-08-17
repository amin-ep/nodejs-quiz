import catchAsync from '../../../utils/catchAsync.js';
import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/IRequest.js';
import User from '../models/User.js';

export class UserController {
  public getAllUsers = catchAsync(
    async (req: IRequest, res: Response, next: NextFunction) => {
      const users = await User.find();

      res.status(200).json({
        status: 'success',
        result: users.length,
        data: {
          users,
        },
      });
    }
  );

  public getQuizById = catchAsync(async (req: IRequest, res: Response) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  });
}
