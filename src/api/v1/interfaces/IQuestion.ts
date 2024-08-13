import { Document } from 'mongoose';

export interface IQuestion extends Document {
  title: string;
  options: string[];
  correctOptionIndex: number;
}
