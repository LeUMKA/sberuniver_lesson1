import { useState } from 'react'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { validationSchema } from '../model/schema'
import type { TFormValues } from '../model/types'

const defaultValues: TFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export const SimpleForm = () => {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TFormValues>({
    resolver: zodResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues,
  })

  const onSubmit = (data: TFormValues) => {
    setSubmittedEmail(data.email)
    reset(defaultValues)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 480,
        width: '100%',
        mt: 4,
        mx: 'auto',
        p: { xs: 3, sm: 4 },
      }}
    >
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <Typography variant="body1">
            Заполните поля.
          </Typography>

          {submittedEmail ? (
            <Alert severity="success">
              Форма отправлена. Проверенный email: {submittedEmail}
            </Alert>
          ) : null}

          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                label="Имя"
                autoComplete="name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message ?? 'Минимум 2 символа'}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                autoComplete="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message ?? 'Например, name@example.com'}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                label="Пароль"
                type="password"
                autoComplete="new-password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message ?? 'Минимум 6 символов'}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <TextField
                {...field}
                label="Подтверждение пароля"
                type="password"
                autoComplete="new-password"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message ?? 'Повторите пароль'}
              />
            )}
          />

          <Button disabled={isSubmitting} type="submit" variant="contained">
            Отправить
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}
