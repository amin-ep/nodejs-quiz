import { Document } from 'mongoose';

interface Grade {
  student: object;
  grade: number;
}

export interface IQuiz extends Document {
  title: string;
  grades: Grade[];
  gradePer: number;
}
