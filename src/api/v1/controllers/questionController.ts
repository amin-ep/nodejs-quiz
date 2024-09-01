import Question from '../models/Question.js';
import Factory from '../handlers/handlerFactory.js';
import { IQuestion } from '../interfaces/IQuestion.js';

class QuestionController extends Factory<IQuestion> {
  constructor() {
    super(Question);
  }
}

export default QuestionController;
