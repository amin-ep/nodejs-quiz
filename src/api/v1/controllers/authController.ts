import { Request, Response, NextFunction } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import User from '../models/User.js';
import {
  loginValidator,
  signupValidator,
} from '../validators/authValidator.js';
import z from 'zod';
import {
  BadRequest,
  NotFound,
  Unauthorized,
} from '../../../utils/httpError.js';
import emailSender from '../helpers/emailSender.js';
import jwt from 'jsonwebtoken';
import { IRequest } from '../interfaces/IRequest.js';

export default class AuthController {
  private async sendVerificationEmail(
    req: Request,
    res: Response,
    code: string,
    statusCode: number
  ) {
    const link = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/verifyEmail/${code}`;
    const html = `
      <p>To confirm your email address please click <a href="${link}"></a>
    `;

    await emailSender(
      res,
      {
        email: req.body.email,
        html,
        subject: code,
        text: 'Click the link to verify your email',
      },
      statusCode
    );
  }

  private async sendPasswordRecoveryEmail(
    req: IRequest,
    res: Response,
    code: string
  ) {
    const link = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/resetPassword/${code}`;

    const html = `
      <p>This is your code: ${code}</p>
      <a href="${link}">Click</a>
    `;

    await emailSender(
      res,
      {
        email: req.body.email,
        html,
        subject: code,
        text: 'Click the link',
      },
      200
    );
  }

  private generateToken(id: string) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  }

  public signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // validate input data
      try {
        await signupValidator.parseAsync(req.body);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return next(new BadRequest(err.errors[0].message));
        }
      }
      if (!req.body.ip) req.body.ip = req.ip;

      // if user exists:
      const existingUser = await User.findOne({ email: req.body.email });
      // does not exists
      if (!existingUser) {
        const newUser = await User.create(req.body);
        const code = newUser.generateVerificationCode();
        await newUser.save({ validateBeforeSave: false });

        this.sendVerificationEmail(req, res, code, 201);
      } else if (existingUser && existingUser.verified === false) {
        const code = existingUser.generateVerificationCode();
        await existingUser.save({ validateBeforeSave: false });
        this.sendVerificationEmail(req, res, code, 200);
      } else if (existingUser && existingUser.active === false) {
        // verified but not active ? set active true and set verified false and send email
        existingUser.active = true;
        existingUser.verified = false;
        const code = existingUser.generateVerificationCode();
        await existingUser.save({ validateBeforeSave: false });

        this.sendVerificationEmail(req, res, code, 201);
      } else if (
        existingUser &&
        existingUser.active === true &&
        existingUser.verified === true
      ) {
        return next(
          // exists and is active and verified send error
          new Unauthorized(
            'There is a user with this account. Please try to login!'
          )
        );
      }
      console.log(req.body);
    }
  );

  public verifyEmail = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await User.findOne({
        verificationCode: req.params.code,
      }).select('+email');

      if (!user) {
        return next(new NotFound('Invalid Verification code'));
      }

      user.verified = true;
      user.verificationCode = undefined;
      await user.save({ validateBeforeSave: false });

      const token = this.generateToken(user.id);

      res.status(200).json({
        status: 'success',
        token,
        data: {
          user,
        },
      });
    }
  );

  public login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // validate input data
      try {
        await loginValidator.parse(req.body);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return next(new BadRequest(err.errors[0].message));
        }
      }
      const user = await User.findOne({ email: req.body.email }).select(
        '+password'
      );

      // if user does not exists return 404

      if (!user || !(await user.verifyPassword(req.body.password))) {
        return next(new BadRequest('Incorrect email or password'));
      } else if (user && user.verified === false) {
        // if user exists and not verified send message to signup
        return next(
          new Unauthorized(
            'This account is not verified yet. Please signup and verify your account'
          )
        );
      } else {
        // if user exists return 200 and user data and generate token
        const token = this.generateToken(user.id);
        res.status(200).json({
          status: 'success',
          token,
          data: {
            user,
          },
        });
      }
    }
  );

  public forgetPassword = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // send email to input email
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return next(new NotFound('There is no account with this email'));
      }

      const code = user.generateResetCode();
      await user.save({ validateBeforeSave: false });

      try {
        await this.sendPasswordRecoveryEmail(req, res, code);
      } catch (err) {
        res.status(500).json({
          status: 'error',
          message: 'something went wrong while sending email',
          err,
        });
      }
    }
  );

  public resetPassword = catchAsync(
    async (req: IRequest, res: Response, next: NextFunction) => {
      // find user by code
      const user = await User.findOne({
        resetCodeExpiresAt: { $gt: Date.now() },
        passwordResetCode: req.params.code,
      });
      // send error if user does not exists or code is expired
      if (!user) {
        return next(new NotFound('invalid or expired code'));
      }

      // update data
      user.password = req.body.password;
      user.passwordChangedAt = new Date();
      user.passwordResetCode = undefined;
      user.resetCodeExpiresAt = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    }
  );
}
