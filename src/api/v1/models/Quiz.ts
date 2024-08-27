import mongoose, { Query, Schema } from 'mongoose';
import { IQuiz } from '../interfaces/IQuiz';

const quizSchema = new Schema<IQuiz>(
  {
    title: String,
    description: String,
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    grade: Number,
    startTime: Date,
    deprecationTime: Date,
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

quizSchema.pre(/^find/, function (this: Query<IQuiz[], IQuiz>, next) {
  this.populate({
    path: 'owner',
    select: 'fullName email',
  }).populate({
    path: 'questions',
    select: 'title options point description -quiz',
  });

  next();
});

export default mongoose.model<IQuiz>('Quiz', quizSchema);
