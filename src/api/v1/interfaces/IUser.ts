import { Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  active: boolean;
  ip: string;
  verificationCode: string | undefined;
  passwordResetCode: string | undefined;
  resetCodeExpiresAt: Date | undefined;
  passwordChangedAt: Date | undefined;
  generateVerificationCode: () => string;
  verifyPassword: (password: string) => boolean;
  generateResetCode: () => string;
  checkPasswordChangedTime: (time: number) => boolean;
}
