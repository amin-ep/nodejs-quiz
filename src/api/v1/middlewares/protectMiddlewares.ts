/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Response, NextFunction } from 'express';
import { Forbidden, NotFound, Unauthorized } from '../../../utils/httpError.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import catchAsync from '../../../utils/catchAsync.js';
import { IRequest } from '../interfaces/IRequest.js';

class ProtectMiddlewares {
  protect = catchAsync(
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
          new Unauthorized('You are not logged in. Please login first')
        );
      }

      // @ts-ignore
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new NotFound('The user does not exists'));
      }

      const userHasChangedPasswordRecently = user.checkPasswordChangedTime(
        decoded.iat as number
      );

      if (userHasChangedPasswordRecently) {
        return next(
          new Unauthorized(
            'The user has changed password recently. Please login again'
          )
        );
      }

      req.user = user;
      next();
    }
  );

  restrictTo(...roles: string[]) {
    return (req: IRequest, _res: Response, next: NextFunction) => {
      if (req.user && !roles.includes(req.user.role)) {
        return next(
          new Forbidden('Yo do not have permission to perform this action')
        );
      }
      next();
    };
  }

  public protectCurrentUser(req: IRequest, res: Response, next: NextFunction) {
    if (req?.user?.id === req.params.id) {
      return next(new Forbidden('You cannot delete your account'));
    }
    next();
  }
}

export default ProtectMiddlewares;
