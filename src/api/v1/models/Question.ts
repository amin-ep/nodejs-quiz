import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema(
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
    // questionType: {
    //   type: String,
    //   enum: ['true or false', 'choice', 'describe'],
    // },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Question', questionSchema);
