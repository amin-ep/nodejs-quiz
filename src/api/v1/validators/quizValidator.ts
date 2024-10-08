import z from 'zod';

const schema = z
  .object({
    title: z
      .string({
        invalid_type_error: '"title" must be a string value',
        required_error: 'Please write a "title" for your quiz',
      })
      .min(4, {
        message: 'A "title" must have at least 4 characters',
      })
      .max(25, {
        message: 'A "title" cannot contain more than 25 characters',
      }),
    description: z
      .string({
        invalid_type_error: '"description" must be a string value',
      })
      .min(10, {
        message: '"description" must contain at least 10 characters',
      })
      .max(100, {
        message: 'A "description" must be 100 characters or less',
      })
      .optional(),
    owner: z.string({
      required_error: 'A quiz must have a "owner" ID',
      invalid_type_error: '"owner" id must be a string value',
    }),
    grade: z
      .number({
        invalid_type_error: 'a "grade" must be a number value',
        required_error: 'A quiz must have a "grade"',
      })
      .max(100, {
        message: 'You cannot set more than 100 "grade" for a quiz',
      })
      .int(),
    startTime: z
      .string({
        required_error: '"startTime" is required',
      })
      .datetime({
        message:
          'Invalid "startTime" format. The "startTime" format should be something like this: 2020-01-01T00:00:00Z',
      }),
    deprecationTime: z
      .string({
        required_error: '"deprecationTime" is required',
        description:
          'the "deprecationTime" field must be look like this: 2020-01-01T00:00:00Z',
      })
      .datetime({
        message:
          'Invalid "deprecationTime" format. The "deprecationTime" format should be something like this: 2020-01-01T00:00:00Z',
      }),
  })
  .strict();

export const createQuizValidator = schema.pick({
  title: true,
  description: true,
  owner: true,
  grade: true,
  startTime: true,
  deprecationTime: true,
});

export const updateQuizValidator = z.object({
  title: z
    .string({
      invalid_type_error: 'title must be a string value',
    })
    .min(4, {
      message: 'A title must have at least 4 characters',
    })
    .max(25, {
      message: 'A title cannot contain more than 25 characters',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be a string value',
    })
    .min(10, {
      message: 'Description must contain at least 10 characters',
    })
    .max(100, {
      message: 'A Description must be 100 characters or less',
    })
    .optional(),
  grade: z
    .number({
      invalid_type_error: 'a grade must be a number value',
      required_error: 'A quiz must have a grade',
    })
    .max(100, {
      message: 'You cannot set more than 100 grade for a quiz',
    })
    .int()
    .optional(),
});
