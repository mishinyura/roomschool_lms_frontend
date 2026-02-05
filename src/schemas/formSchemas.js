import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

export const validationSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, 'Введите логин'),
    password: z.string().min(4, 'Минимум 4 символов'),
  })
);