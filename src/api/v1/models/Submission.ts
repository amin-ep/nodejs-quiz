import mongoose, { Schema, Query, Model } from 'mongoose';
import {
  ISubmission,
  ICurrentAnswer,
  // ISubmissionModel,
} from '../interfaces/ISubmission.js';
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
    sumPoints: Number,
    graded: Boolean,
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

  const selectedOptionIndex: number = currentAnswer?.selectedOptionIndex;

  const questionId: object = currentAnswer?.question;
  const question = await Question.findById(questionId);

  if (selectedOptionIndex === question?.correctOptionIndex) {
    currentAnswer.correction = true;
  } else {
    currentAnswer.correction = false;
  }

  next();
});

submissionSchema.pre('save', async function (this: ISubmission, next) {
  const submission = this as unknown as ISubmission;
  const model = this.constructor as Model<ISubmission>;
  const calcSumPoint: { _id: null; sumPoints: number }[] =
    await model.aggregate([
      {
        $match: { _id: submission._id },
      },
      { $unwind: '$answers' },
      {
        $lookup: {
          from: 'questions',
          localField: 'answers.question',
          as: 'questionDetails',
          foreignField: '_id',
        },
      },
      {
        $unwind: '$questionDetails',
      },
      {
        $match: { 'answers.correction': true },
      },
      {
        $group: {
          _id: null,
          sumPoints: { $sum: '$questionDetails.point' },
        },
      },
    ]);

  this.sumPoints = calcSumPoint[0].sumPoints;
  next();
});

submissionSchema.pre('save', async function (this: ISubmission, next) {
  const submission = this as unknown as ISubmission;
  const model = this.constructor as Model<ISubmission>;

  const unwindQuiz = await model.aggregate([
    {
      $match: { _id: submission._id },
    },
    {
      $lookup: {
        from: 'quizzes',
        foreignField: '_id',
        localField: 'quiz',
        as: 'quizDetails',
      },
    },
    {
      $unwind: '$quizDetails',
    },
    {
      $project: { _id: '$quizDetails' },
    },
  ]);

  const quizGrade: number = unwindQuiz[0]._id.grade;

  const minPointToGrade: number = quizGrade / 2;

  if (this.sumPoints >= minPointToGrade) {
    this.graded = true;
  } else {
    this.graded = false;
  }

  next();
});

export default mongoose.model('Submission', submissionSchema);
