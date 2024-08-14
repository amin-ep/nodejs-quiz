import mongoose, { Schema } from 'mongoose';

const quizSchema = new Schema(
  {
    title: String,
    description: String,
    teacherId: {
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

export default mongoose.model('Quiz', quizSchema);
