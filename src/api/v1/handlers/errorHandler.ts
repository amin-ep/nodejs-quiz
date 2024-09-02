/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import HttpError, { NotFound, Unauthorized } from '../../../utils/httpError.js';

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

const handleCastError = (err: HttpError) => {
  //@ts-ignore
  const message = `Invalid Id: ${err.value}`;
  return new NotFound(message);
};

const handleTokenExpiredError = () => {
  return new Unauthorized('The token has been expired. Please login again!');
};

const handleJWTError = () => {
  return new Unauthorized('Invalid token. Please Login again!');
};

export default function (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if ((process.env.NODE_ENV as string) === 'development') {
    developmentError(err, res);
  } else {
    if (err.name === 'CastError') err = handleCastError(err);
    if (err.name === 'TokenExpiredError') err = handleTokenExpiredError();
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    productionError(err, res);
  }
}
