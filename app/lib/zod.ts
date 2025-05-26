import {object, string } from 'zod';

export const signInSchema = object({
  password: string().min(1, 'Password is required'),
});