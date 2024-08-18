import Quiz from '../models/Quiz.js';
import Factory from '../handlers/handlerFactory.js';
import { IQuiz } from '../interfaces/IQuiz.js';
import catchAsync from '../../../utils/catchAsync.js';
import { IRequest } from '../interfaces/IRequest.js';
import { Response } from 'express';
// class QuizController {
//   getAllQuizzes = catchAsync(async (_req: IRequest, res: Response) => {
//     const quiz = await Quiz.find().populate({
//       path: 'questions',
//       select: 'title options -quiz',
//     });

//     res.status(200).json({
//       status: 'success',
//       result: quiz.length,
//       data: {
//         quiz,
//       },
//     });
//   });

//   getQuizById = catchAsync(async (req: IRequest, res: Response) => {
//     const quiz = await Quiz.findById(req.params.id);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         quiz,
//       },
//     });
//   });

//   createQuiz = catchAsync(
//     async (req: IRequest, res: Response, next: NextFunction) => {
//       try {
//         createQuizValidator.parse(req.body);
//       } catch (err) {
//         if (err instanceof ZodError) {
//           return next(new HttpError(err.errors[0].message, 400));
//         }
//       }

//       const newQuiz = await Quiz.create(req.body);

//       res.status(201).json({
//         status: 'success',
//         data: {
//           quiz: newQuiz,
//         },
//       });
//     }
//   );

//   updateQuiz = catchAsync(
//     async (req: IRequest, res: Response, next: NextFunction) => {
//       try {
//         updateQuizValidator.parse(req.body);
//       } catch (err) {
//         if (err instanceof ZodError) {
//           return next(new HttpError(err.errors[0].message, 400));
//         }
//       }

//       const updatedQuiz = await Quiz.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//         }
//       );

//       res.status(200).json({
//         status: 'success',
//         data: {
//           updatedQuiz,
//         },
//       });
//     }
//   );

//   deleteQuiz = catchAsync(async (req: IRequest, res: Response) => {
//     await Quiz.findByIdAndDelete(req.params.id);

//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   });

//   getMyQuizzes = catchAsync(async (req: IRequest, res: Response) => {
//     const quizzes = await Quiz.find({ teacherId: req.user?.id });

//     res.status(200).json({
//       status: 'success',
//       result: quizzes.length,
//       data: {
//         quizzes,
//       },
//     });
//   });
// }

export default class QuizController extends Factory<IQuiz> {
  constructor() {
    super(Quiz);
  }

  getMyQuizzes = catchAsync(async (req: IRequest, res: Response) => {
    const quizzes = await Quiz.find({ teacherId: req.user?.id });

    res.status(200).json({
      status: 'success',
      result: quizzes.length,
      data: {
        quizzes,
      },
    });
  });
}
