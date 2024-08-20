import z from 'zod';

export const updateUserValidator = z.object({
  fullName: z
    .string({
      required_error: 'fullName is required',
      invalid_type_error: 'fullName must be a string',
    })
    .min(5, { message: 'fullName must contain at least 5 characters' })
    .max(20, { message: 'fullName cannot contain more than 20 characters' })
    .optional(),
  email: z
    .string()
    .email({
      message: 'Invalid email address. Please input a valid address',
    })
    .optional(),
  role: z
    .enum(['admin', 'teacher', 'student'], {
      message: 'The user role must be admin, teacher or student',
      invalid_type_error: 'The user role must be a string',
    })
    .refine(val => val !== 'admin', {
      message: 'A user must be a teacher or student',
    })
    .optional(),
  verified: z
    .boolean()
    .refine(val => val == false, {
      message: 'You cannot access to this field',
    })
    .optional(),
});
