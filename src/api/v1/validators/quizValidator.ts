import z from 'zod';

const schema = z
  .object({
    title: z
      .string({
        invalid_type_error: 'title must be a string value',
        required_error: 'Please write a title for your quiz',
      })
      .min(4, {
        message: 'A title must have at least 4 characters',
      })
      .max(25, {
        message: 'A title cannot contain more than 25 characters',
      }),
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
    teacherID: z.string({
      required_error: 'A quiz must have a teacherID',
      invalid_type_error: 'Teacher id must be a string value',
    }),
  })
  .strict();

export const createQuizValidator = schema.pick({
  title: true,
  teacherID: true,
});
