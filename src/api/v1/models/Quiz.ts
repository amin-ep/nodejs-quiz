import mongoose, { Schema } from 'mongoose';

const quizSchema = new Schema(
  {
    title: String,
    description: String,
    teacherID: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    // students: [
    //   {
    //     ref: 'User',
    //     type: Schema.Types.ObjectId,
    //     grade: Number,
    //   },
    // ],
    // questions: [
    //   {
    //     type: Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Quiz', quizSchema);
