import { Request, Response, NextFunction } from 'express';
import { ZodError, AnyZodObject } from 'zod';

export default function validationMiddleware(validator: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      validator.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err);
        next();
      }
      next();
    }
  };
}
