import z from 'zod';

export const createQuestionValidator = z
  .object({
    title: z.string({
      required_error: 'A question must have a title',
      invalid_type_error: 'A question must be a string value',
    }),
    options: z
      .string({
        required_error: 'Please write some options for your question',
        invalid_type_error: 'options must be array of string',
      })
      .array()
      .min(2, {
        message: 'A question must have at least 2 options',
      })
      .nonempty({
        message: 'You have to write at least two options for a question',
      }),
    correctOptionIndex: z
      .number({
        required_error:
          'Select to correct option of your question with a number',
      })
      .int()
      .nonnegative(),
    quiz: z.string({
      required_error: 'A question must belong to a quiz',
    }),
    owner: z.string({
      required_error: 'A question must have a owner ID',
      invalid_type_error: 'Owner id must be a string value',
    }),
    point: z.number({
      invalid_type_error: 'Point must be a number value',
      required_error:
        'every questions must have a point of a quiz. Please provide a valid point for this question',
    }),
  })
  .strict()
  .refine(
    s => {
      return !(s.options.length < s.correctOptionIndex);
    },
    {
      message: 'You are selected a wrong number of your options',
    }
  );

export const updateQuestionValidator = z
  .object({
    title: z.string({
      required_error: 'A question must have a title',
      invalid_type_error: 'A question must be a string value',
    }),
    options: z
      .string({
        required_error: 'Please write some options for your question',
        invalid_type_error: 'options must be array of string',
      })
      .array()
      .min(2, {
        message: 'A question must have at least 2 options',
      })
      .nonempty({
        message: 'You have to write at least two options for a question',
      })
      .optional(),
    correctOptionIndex: z
      .number({
        required_error:
          'Select to correct option of your question with a number',
      })
      .int()
      .nonnegative()
      .optional(),
    point: z
      .number({ invalid_type_error: 'Point must be a number value' })
      .optional(),
  })
  .strict()
  .refine(
    s => {
      return !(
        s.options &&
        s.correctOptionIndex &&
        s.options.length < s.correctOptionIndex
      );
    },
    {
      message: 'You are selected a wrong number of your options',
    }
  );
