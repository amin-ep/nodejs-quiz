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
    owner: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Question', questionSchema);
