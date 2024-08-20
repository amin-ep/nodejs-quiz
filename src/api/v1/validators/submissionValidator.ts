import z from 'zod';

export const createSubmissionValidator = z
  .object({
    quiz: z.string({
      required_error: 'each submission must create on a quiz',
      invalid_type_error: 'submission quiz must be a string value',
    }),
    owner: z.string({
      invalid_type_error: 'owner field must be a string value',
      required_error:
        'each submission must created by a student(student is owner)',
    }),
    answers: z
      .object(
        {
          question: z.string({
            required_error: 'please provide a question id on your submission',
          }),
          selectedOptionIndex: z
            .number({
              required_error:
                'Please select the correct option of question in this field',
            })
            .int(),
        },
        {
          required_error:
            'please provide an object that contains your selected question and the correct option of that question',
        }
      )
      .array(),
  })
  .strict();
