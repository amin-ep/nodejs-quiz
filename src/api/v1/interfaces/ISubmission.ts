import { Types, Document } from 'mongoose';

export interface ISubmission extends Document {
  quiz: Types.ObjectId;
  answers: Types.ObjectId[];
  owner: Types.ObjectId;
  graded: boolean;
}
