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
    email: z
      .string({
        required_error: '"email" is required',
      })
      .email({
        message: 'Invalid email address. Please input a valid address',
      }),
    password: z
      .string({
        required_error: '"password" is required',
      })
      .trim()
      .min(8, {
        message:
          'Password is too short, please input a secure password(at least 8 characters)',
      })
      .max(14, {
        message: 'Password cannot contain more than 14 characters',
      }),
    role: z
      .enum(['admin', 'teacher', 'student'], {
        message: 'The user role must be admin, teacher or student',
        invalid_type_error: 'The user role must be a string',
      })
      .default('student')
      .refine(val => val !== 'admin', {
        message: 'A user must be a teacher or student',
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
    role: true,
  })
  .required();

export const loginValidator = schema
  .pick({
    email: true,
    password: true,
  })
  .required();

export const forgetPasswordValidator = z.object({
  email: z
    .string({
      required_error: 'Please input your email',
      invalid_type_error: 'Email value must be a string value',
    })
    .email({
      message: 'Invalid email address. Please input a valid address',
    }),
});

export const resetPasswordValidator = z.object({
  password: z
    .string({
      required_error: 'Please input a password',
      invalid_type_error: 'Password must be a string value',
    })
    .trim()
    .min(8, {
      message:
        'Password is too short, please input a secure password(at least 8 characters)',
    })
    .max(14, {
      message: 'Password cannot contain more than 14 characters',
    }),
});
