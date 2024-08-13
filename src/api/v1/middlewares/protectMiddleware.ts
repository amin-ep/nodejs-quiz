/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Response, NextFunction } from 'express';
import HttpError from '../../../utils/httpError.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import catchAsync from '../../../utils/catchAsync.js';
import { IRequest } from '../interfaces/IRequest.js';

export const protect = catchAsync(
  async (req: IRequest, _res: Response, next: NextFunction) => {
    let token: string = '';

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new HttpError('You are not logged in. Please login first', 401)
      );
    }

    // @ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new HttpError('The user does not exists', 404));
    }

    // add: if user changed password recently

    req.user = user;
    next();
  }
);
