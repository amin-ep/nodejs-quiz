import { IUser } from './IUser.js';
import { Request } from 'express';

export interface IRequest extends Request {
  user?: IUser | undefined;
}
