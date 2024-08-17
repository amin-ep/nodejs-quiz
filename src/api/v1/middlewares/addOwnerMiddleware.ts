import { Response, NextFunction } from 'express';
import { IRequest } from '../interfaces/IRequest.js';
export const addOwnerMiddleware = (
  req: IRequest,
  _res: Response,
  next: NextFunction
) => {
  if (req.user) {
    if (!req.body.owner) req.body.owner = req.user.id;
  }
  next();
};
