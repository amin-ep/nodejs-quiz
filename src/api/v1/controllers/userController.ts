// import catchAsync from '../../../utils/catchAsync.js';
// import { NextFunction, Response } from 'express';
// import { IRequest } from '../interfaces/IRequest.js';
import Factory from '../handlers/handlerFactory.js';
import { IUser } from '../interfaces/IUser.js';
import User from '../models/User.js';

export default class UserController extends Factory<IUser> {
  constructor() {
    super(User);
  }
  // deleteUser = catchAsync(
  //   async (req: IRequest, res: Response, next: NextFunction) => {
  //     const user = await User.findOne({ _id: req.params.id });

  //     if (!user) {
  //       return next(new HttpError(`Invalid id: ${req.params.id}`, 404));
  //     }

  //     if (user.id === req?.user?.id)
  //       return next(
  //         new HttpError('You cannot delete your account this way.', 403)
  //       );

  //     user.active = false;
  //     user.save({ validateBeforeSave: false });

  //     res.status(204).json({
  //       status: 'success',
  //       message: 'The user deactivated successfully',
  //       data: {
  //         user,
  //       },
  //     });
  //   }
  // );
}
