import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import {
  Form,
  Formik,
  type FormikErrors,
  type FormikHelpers,
  type FormikProps,
} from 'formik'
import { stepByStepValidationSchemas } from '../model/stepByStepSchema'
import type { TFormValues } from '../model/types'

const initialValues: TFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const stepLabels = ['Контакты', 'Безопасность', 'Проверка'] as const
const lastStepIndex = stepLabels.length - 1

const stepFields: Array<Array<keyof TFormValues>> = [
  ['name', 'email'],
  ['password', 'confirmPassword'],
  [],
]

const hasStepErrors = (errors: FormikErrors<TFormValues>, step: number) =>
  stepFields[step].some((field) => Boolean(errors[field]))

const markStepTouched = async (formik: FormikProps<TFormValues>, step: number) => {
  await Promise.all(
    stepFields[step].map((field) => formik.setFieldTouched(field, true, false)),
  )
}

export const StepByStepForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [submittedData, setSubmittedData] = useState<TFormValues | null>(null)

  const handleSubmit = (values: TFormValues, helpers: FormikHelpers<TFormValues>) => {
    setSubmittedData(values)
    helpers.resetForm()
    setActiveStep(0)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 560,
        width: '100%',
        mt: 4,
        mx: 'auto',
        p: { xs: 3, sm: 4 },
      }}
    >
      <Stack spacing={3}>
        <Typography variant="body1">
          Нужно заполнить каждый шаг формы.
        </Typography>

        {submittedData ? (
          <Alert severity="success">
            Последовательная форма отправлена. Проверенный email: {submittedData.email}
          </Alert>
        ) : null}

        <Stepper activeStep={activeStep} alternativeLabel>
          {stepLabels.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Formik<TFormValues>
          initialValues={initialValues}
          validationSchema={stepByStepValidationSchemas[activeStep]}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const nextStep = async () => {
              await markStepTouched(formik, activeStep)
              const errors = await formik.validateForm()

              if (hasStepErrors(errors, activeStep)) {
                return
              }

              setActiveStep((currentStep) => currentStep + 1)
            }

            const prevStep = () => {
              setActiveStep((currentStep) => currentStep - 1)
            }

            return (
              <Form noValidate>
                <Stack spacing={2.5}>
                  {activeStep === 0 ? (
                    <>
                      <TextField
                        label="Имя"
                        name="name"
                        autoComplete="name"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.touched.name && formik.errors.name)}
                        helperText={
                          formik.touched.name && formik.errors.name
                            ? formik.errors.name
                            : 'Минимум 2 символа'
                        }
                      />

                      <TextField
                        label="Email"
                        name="email"
                        autoComplete="email"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        helperText={
                          formik.touched.email && formik.errors.email
                            ? formik.errors.email
                            : 'Например, name@example.com'
                        }
                      />
                    </>
                  ) : null}

                  {activeStep === 1 ? (
                    <>
                      <TextField
                        label="Пароль"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        helperText={
                          formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : 'Минимум 6 символов'
                        }
                      />

                      <TextField
                        label="Подтверждение пароля"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        fullWidth
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(
                          formik.touched.confirmPassword && formik.errors.confirmPassword,
                        )}
                        helperText={
                          formik.touched.confirmPassword && formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : 'Повторите пароль'
                        }
                      />
                    </>
                  ) : null}

                  {activeStep === lastStepIndex ? (
                    <Stack spacing={1.5}>
                      <Typography variant="h6">
                        Проверьте данные перед отправкой
                      </Typography>
                      <Box>
                        <Typography variant="subtitle2">Имя</Typography>
                        <Typography>{formik.values.name || 'Не заполнено'}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Email</Typography>
                        <Typography>{formik.values.email || 'Не заполнено'}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">Пароль</Typography>
                        <Typography>
                          {formik.values.password
                            ? `Заполнен, длина ${formik.values.password.length} символов`
                            : 'Не заполнен'}
                        </Typography>
                      </Box>
                    </Stack>
                  ) : null}

                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={prevStep}
                      type="button"
                      variant="text"
                    >
                      Назад
                    </Button>

                    {activeStep < lastStepIndex ? (
                      <Button onClick={nextStep} type="button" variant="contained">
                        Далее
                      </Button>
                    ) : (
                      <Button
                        disabled={formik.isSubmitting}
                        type="submit"
                        variant="contained"
                      >
                        Отправить
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Form>
            )
          }}
        </Formik>
      </Stack>
    </Paper>
  )
}
