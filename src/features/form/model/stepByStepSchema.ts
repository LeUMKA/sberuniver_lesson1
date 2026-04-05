import * as yup from 'yup'

const nameErrorMessage = 'Имя должно быть не короче 2 символов'
const emailErrorMessage = 'Введите корректный email'
const passwordErrorMessage = 'Пароль должен быть не короче 6 символов'
const confirmPasswordErrorMessage =
  'Подтверждение пароля должно быть не короче 6 символов'
const passwordMismatchErrorMessage = 'Пароли не совпадают'

const nameSchema = yup
  .string()
  .trim()
  .required(nameErrorMessage)
  .min(2, nameErrorMessage)

const emailSchema = yup
  .string()
  .trim()
  .required(emailErrorMessage)
  .email(emailErrorMessage)

const passwordSchema = yup
  .string()
  .required(passwordErrorMessage)
  .min(6, passwordErrorMessage)

const confirmPasswordSchema = yup
  .string()
  .required(confirmPasswordErrorMessage)
  .min(6, confirmPasswordErrorMessage)
  .oneOf([yup.ref('password')], passwordMismatchErrorMessage)

export const stepByStepValidationSchemas = [
  yup.object({
    name: nameSchema,
    email: emailSchema,
  }),
  yup.object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  }),
  yup.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  }),
] as const
