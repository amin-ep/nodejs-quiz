import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';
import HttpError from '../../../utils/httpError.js';

export default function validationMiddleware(validator: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validator.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new HttpError(err.errors[0].message, 400));
      }
    }
  };
}
