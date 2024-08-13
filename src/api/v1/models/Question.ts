import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema(
  {
    title: String,
    options: [String],
    correctOptionIndex: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Question', questionSchema);
