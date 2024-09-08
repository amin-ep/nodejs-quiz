import Quiz from '../models/Quiz.js';
import Factory from '../handlers/handlerFactory.js';
import { IQuiz } from '../interfaces/IQuiz.js';

export default class QuizController extends Factory<IQuiz> {
  constructor() {
    super(Quiz);
  }
}
