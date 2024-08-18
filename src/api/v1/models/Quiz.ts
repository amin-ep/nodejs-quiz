import mongoose, { Schema } from 'mongoose';
import { IQuiz } from '../interfaces/IQuiz';

const quizSchema = new Schema<IQuiz>(
  {
    title: String,
    description: String,
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

quizSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'quiz',
});

export default mongoose.model<IQuiz>('Quiz', quizSchema);
