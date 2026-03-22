import { z } from 'zod'

export const validationSchema = z
  .object({
    name: z.string().trim().min(2, 'Имя должно быть не короче 2 символов'),
    email: z.email('Введите корректный email'),
    password: z.string().min(6, 'Пароль должен быть не короче 6 символов'),
    confirmPassword: z
      .string()
      .min(6, 'Подтверждение пароля должно быть не короче 6 символов'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  })

export type TFormValues = z.infer<typeof validationSchema>
