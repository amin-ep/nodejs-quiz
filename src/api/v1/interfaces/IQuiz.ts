import { Document, Types } from 'mongoose';

export interface IQuiz extends Document {
  title: string;
  description?: string | undefined;
  owner: Types.ObjectId;
  grade: number;
}
