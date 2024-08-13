import { Response } from 'express';
import emailService from '../../../utils/email.js';
import { EmailOptions } from '../interfaces/IEmail.js';
import HttpError from '../../../utils/httpError.js';

export default async function emailSender(
  res: Response,
  options: EmailOptions,
  statusCode: number
) {
  try {
    await emailService(options);
    res.status(statusCode).json({
      status: 'success',
      message: `An email sent to ${options.email}`,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while sending error',
      err: err as HttpError,
    });
  }
}
