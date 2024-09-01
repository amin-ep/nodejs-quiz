import mongoose, { Schema, Types } from 'mongoose';
import { IQuestion } from '../interfaces/IQuestion.js';
import Quiz from './Quiz.js';
import { IQuiz } from '../interfaces/IQuiz.js';
import HttpError from '../../../utils/httpError.js';

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

interface IPopulateQuiz extends IQuiz {
  questions: {
    _id: Types.ObjectId;
    title: string;
    options: string[];
    point: number;
  }[];
}

// avoid creating extra questions
questionSchema.pre('save', async function (this: IQuestion, next) {
  const quiz: IPopulateQuiz | undefined | null = await Quiz.findById(
    this.quiz.toString()
  );
  let sumQuestionPoints: number = 0;

  if (quiz) {
    const quizQuestionPointsArr: number[] = quiz?.questions.map(el => el.point);
    for (let i: number = 0; quizQuestionPointsArr.length > i; i++) {
      sumQuestionPoints += quizQuestionPointsArr[i];
    }

    if (this.point + sumQuestionPoints > quiz.grade) {
      return next(
        new HttpError(
          'The points of questions are getting grater than quiz grade. Please edit some questions or do not more!',
          403
        )
      );
    }
  }

  next();
});

export default mongoose.model<IQuestion>('Question', questionSchema);
