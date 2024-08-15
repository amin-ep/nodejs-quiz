import { NextFunction, Response } from 'express';
import { IRequest } from '../interfaces/IRequest.js';
import { isValidObjectId } from 'mongoose';
import HttpError from '../../../utils/httpError.js';

export default function checkID(
  req: IRequest,
  res: Response,
  next: NextFunction,
  val: string
) {
  if (!isValidObjectId(val)) {
    return next(new HttpError(`Invalid Id: ${req.params.id}`, 404));
  }
  next();
}
