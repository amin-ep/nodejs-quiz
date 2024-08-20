import mongoose, { Schema } from 'mongoose';
import { IQuestion } from '../interfaces/IQuestion.js';
const questionSchema = new Schema<IQuestion>(
  {
    title: String,
    options: [String],
    correctOptionIndex: {
      type: Number,
    },
    quiz: {
      ref: 'Quiz',
      type: Schema.Types.ObjectId,
    },
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    point: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IQuestion>('Question', questionSchema);
