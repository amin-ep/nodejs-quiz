import mongoose, { Schema } from 'mongoose';

const questionSchema = new Schema(
  {
    title: String,
    options: [String],
    correctOptionIndex: {
      type: Number,
      // || Boolean || String
    },
    quiz: {
      ref: 'Quiz',
      type: Schema.Types.ObjectId,
    },
    // questionType: {
    //   type: String,
    //   enum: ['true/false', 'describe', 'choose'],
    // },
  },
  {
    timestamps: true,
  }
);

// questionSchema.pre('save', function (next) {
//   if (typeof this.questionType === 'string') {
//     switch (typeof this.correctOptionIndex) {
//       case 'string':
//         this.questionType = 'describe';
//         break;
//       case 'number':
//         this.questionType = 'choose';
//         break;
//       case 'boolean':
//         this.questionType = 'true/false';
//     }
//   }
//   next();
// });

export default mongoose.model('Question', questionSchema);
