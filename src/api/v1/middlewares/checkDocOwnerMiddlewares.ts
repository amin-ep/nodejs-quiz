// import { Response, NextFunction } from 'express';
// import { IRequest } from '../interfaces/IRequest.js';
// import { Document } from 'mongoose';
// import HttpError from '../../../utils/httpError.js';

// export const checkDocOwnerMiddleware = (model: () => void) => {
//   return async (req: IRequest, _res: Response, next: NextFunction) => {
//     const document: Document = await model.findById(req.params.id);

//     if (req.user?.role === 'admin') next();
//     else if (req.user?.id !== document.owner)
//       return next(
//         new HttpError('You do not have permission to preform this action!', 403)
//       );

//     next();
//   };
// };
