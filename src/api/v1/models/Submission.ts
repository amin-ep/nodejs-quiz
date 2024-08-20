import mongoose, { Schema } from 'mongoose';
import { ISubmission } from '../interfaces/ISubmission.js';

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
        correction: Number,
      },
    ],
    graded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Submission', submissionSchema);
