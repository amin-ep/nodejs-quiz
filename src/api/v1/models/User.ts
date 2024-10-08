import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser.js';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

const userSchema: Schema<IUser> = new Schema(
  {
    fullName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      default: 'student',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    ip: String,
    verificationCode: String,
    passwordResetCode: String,
    resetCodeExpiresAt: Date,
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.index({ role: -1 });

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.generateVerificationCode = function () {
  this.verificationCode = uuid();
  return this.verificationCode;
};

userSchema.methods.verifyPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateResetCode = function () {
  this.passwordResetCode = uuid();
  this.resetCodeExpiresAt = moment(Date.now()).add(10, 'minutes');
  return this.passwordResetCode;
};

userSchema.methods.checkPasswordChangedTime = function (
  JWTGeneratedTime: number
) {
  if (this.passwordChangedAt) {
    return JWTGeneratedTime < this.passwordChangedAt.getTime() / 1000;
  }
};

export default mongoose.model('User', userSchema);
