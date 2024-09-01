import { Types, Document } from 'mongoose';

export interface ICurrentAnswer {
  selectedOptionIndex: number;
  question: { _id: Types.ObjectId; correctOptionIndex: number };
  correction: boolean;
  _id: Types.ObjectId;
}

export interface ISubmission extends Document {
  quiz: Types.ObjectId;
  answers: ICurrentAnswer[];
  owner: Types.ObjectId;
  sumPoints: number;
  graded: boolean;
}
