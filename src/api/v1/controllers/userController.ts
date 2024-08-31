// import catchAsync from '../../../utils/catchAsync.js';
// import { NextFunction, Response } from 'express';
// import { IRequest } from '../interfaces/IRequest.js';
import Factory from '../handlers/handlerFactory.js';
import { IUser } from '../interfaces/IUser.js';
import User from '../models/User.js';

export default class UserController extends Factory<IUser> {
  constructor() {
    super(User);
  }
}
