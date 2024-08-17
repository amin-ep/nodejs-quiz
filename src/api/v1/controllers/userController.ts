import catchAsync from '../../../utils/catchAsync.js';
import { Response } from 'express';
import { IRequest } from '../interfaces/IRequest.js';
import User from '../models/User.js';

export default class UserController {
  public getAllUsers = catchAsync(async (req: IRequest, res: Response) => {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  });

  public getUserById = catchAsync(async (req: IRequest, res: Response) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  });
}
