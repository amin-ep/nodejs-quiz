import mongoose, { Schema, Query } from 'mongoose';
import { ISubmission, ICurrentAnswer } from '../interfaces/ISubmission.js';
import Question from './Question.js';

const submissionSchema = new Schema<ISubmission>(
  {
    quiz: {
      ref: 'Quiz',
      type: Schema.Types.ObjectId,
    },
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    answers: [
      {
        question: {
          ref: 'Question',
          type: Schema.Types.ObjectId,
        },
        selectedOptionIndex: Number,
        correction: Boolean,
      },
    ],
    obtainedGrade: Number,
    graded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

submissionSchema.pre(
  /^find/,
  function (this: Query<ISubmission[], ISubmission>, next) {
    this.populate({
      path: 'owner',
      select: 'fullName email',
    })
      .populate({
        path: 'quiz',
        select: 'title grade description',
      })
      .populate({
        path: 'answers.question',
        select: 'title options correctOptionIndex point',
      });
    next();
  }
);

submissionSchema.pre('save', async function (next) {
  const currentAnswerArr: ICurrentAnswer[] = this.answers;
  const currentAnswer: ICurrentAnswer =
    currentAnswerArr[this.answers.length - 1];
  console.log(currentAnswer);

  const selectedOptionIndex: number = currentAnswer?.selectedOptionIndex;
  console.log(selectedOptionIndex);

  const questionId: object = currentAnswer?.question;
  const question = await Question.findById(questionId);

  if (selectedOptionIndex === question?.correctOptionIndex) {
    currentAnswer.correction = true;
  } else {
    currentAnswer.correction = false;
  }

  next();
});

export default mongoose.model('Submission', submissionSchema);
