import { Document, Types } from 'mongoose';
export interface IQuestion extends Document {
  title: string;
  options: string[];
  correctOptionIndex: number;
  quiz: Types.ObjectId;
  owner: Types.ObjectId;
  point: number;
  calcSumPoint: () => void;
}
