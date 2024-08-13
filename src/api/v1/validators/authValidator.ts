import z from 'zod';

const schema = z
  .object({
    fullName: z
      .string({
        required_error: 'fullName is required',
        invalid_type_error: 'fullName must be a string',
      })
      .min(5, { message: 'fullName must contain at least 5 characters' })
      .max(20, { message: 'fullName cannot contain more than 20 characters' }),
    email: z.string().email({
      message: 'Invalid email address. Please input a valid address',
    }),
    password: z
      .string()
      .trim()
      .min(8, {
        message:
          'Password is too short, please input a secure password(at least 8 characters)',
      })
      .max(14, {
        message: 'Password cannot contain more than 14 characters',
      }),
    role: z.enum(['admin', 'teacher', 'student'], {
      message: 'The user role must be admin, teacher or student',
      invalid_type_error: 'The user role must be a string',
    }),
    verified: z
      .boolean()
      .default(false)
      .refine(val => val == false, {
        message: 'You cannot access to this field',
      }),
    active: z.boolean().default(true),
    verificationCode: z.string().uuid(),
  })
  .strict();

export const signupValidator = schema
  .pick({
    fullName: true,
    email: true,
    password: true,
  })
  .required();

export const loginValidator = schema
  .pick({
    email: true,
    password: true,
  })
  .required();
