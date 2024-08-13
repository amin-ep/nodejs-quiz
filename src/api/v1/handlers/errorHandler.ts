import { Request, Response, NextFunction } from 'express';
import HttpError from '../../../utils/httpError.js';

const developmentError = (err: HttpError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
    stack: err.stack,
  });
};

const productionError = (err: HttpError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'something went wrong from server!',
      err,
    });
  }
};

export default function (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if ((process.env.NODE_ENV as string) === 'development') {
    developmentError(err, res);
  } else {
    productionError(err, res);
  }
}
