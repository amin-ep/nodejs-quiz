import { Document } from 'mongoose';
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
  active: boolean;
  verificationCode: string | undefined;
  generateVerificationCode: () => string;
  verifyPassword: (password: string) => boolean;
}
