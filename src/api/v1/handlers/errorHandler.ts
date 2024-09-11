/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response, NextFunction } from 'express';
import HttpError, { NotFound, Unauthorized } from '../../../utils/httpError.js';
import logger from '../../../utils/logger.js';
import { IRequest } from '../interfaces/IRequest.js';

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

const handleLargePayloadError = (err: HttpError) => {
  return new HttpError(err.message, 413);
};

export default function (
  err: HttpError,
  req: IRequest,
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
    if (err.statusCode === 413) err = handleLargePayloadError(err);
    productionError(err, res);
  }

  const loggerMessage = `${err.statusCode} ${err.message}. IP: ${req.ip}`;

  logger.log('error', loggerMessage);
}
