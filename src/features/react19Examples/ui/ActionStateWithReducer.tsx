import { startTransition, useActionState, useEffect, useReducer } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type {
  IFormDataWithReducer,
  IFormStateWithReducer,
  TFormAction,
} from '../model/types'

const initialFormState: IFormStateWithReducer = {
  values: {
    name: '',
    email: '',
    description: '',
  },
  dirty: false,
  submitting: false,
  success: false,
  errors: {},
}

function formReducer(
  state: IFormStateWithReducer,
  action: TFormAction,
): IFormStateWithReducer {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: action.payload.value,
        },
        dirty: true,
      }

    case 'SET_DIRTY':
      return {
        ...state,
        dirty: action.payload,
      }

    case 'SET_SUBMITTING':
      return {
        ...state,
        submitting: action.payload,
      }

    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.payload,
      }

    case 'SET_ERROR':
      return {
        ...state,
        errors: action.payload,
      }

    case 'RESET':
      return initialFormState

    default:
      return state
  }
}

function validateForm(
  values: IFormDataWithReducer,
): Partial<Record<keyof IFormDataWithReducer, string>> {
  const errors: Partial<Record<keyof IFormDataWithReducer, string>> = {}

  if (!values.name.trim()) {
    errors.name = 'Имя обязательно'
  }

  if (!values.email.trim()) {
    errors.email = 'Email обязателен'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Неверный формат email'
  }

  if (!values.description.trim()) {
    errors.description = 'Описание обязательно'
  } else if (values.description.length < 10) {
    errors.description = 'Описание должно содержать минимум 10 символов'
  }

  return errors
}

async function submitFormAction(
  _prevState: unknown,
  formData: FormData,
): Promise<{ success: boolean; message?: string }> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const description = formData.get('description') as string

  const values = { name, email, description }
  const errors = validateForm(values)

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Ошибка валидации',
    }
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      success: true,
      message: `Профиль сохранён: ${name} (${email})`,
    }
  } catch (err) {
    return {
      success: false,
      message: 'Ошибка при сохранении профиля. Попробуйте ещё раз.',
    }
  }
}

export const ActionStateWithReducer = () => {
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState)

  const [actionState, formAction, isPending] = useActionState(submitFormAction, {
    success: false,
  })

  const handleFieldChange = (field: keyof IFormDataWithReducer, value: string) => {
    dispatchForm({
      type: 'SET_FIELD',
      payload: { field, value },
    })
    if (formState.errors[field]) {
      dispatchForm({
        type: 'SET_ERROR',
        payload: { ...formState.errors, [field]: undefined },
      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validateForm(formState.values)

    if (Object.keys(errors).length > 0) {
      dispatchForm({
        type: 'SET_ERROR',
        payload: errors,
      })
      return
    }

    dispatchForm({
      type: 'SET_SUBMITTING',
      payload: true,
    })

    const fd = new FormData()
    fd.set('name', formState.values.name)
    fd.set('email', formState.values.email)
    fd.set('description', formState.values.description)

    startTransition(() => {
      void formAction(fd)
    })
  }

  useEffect(() => {
    if (!formState.submitting || isPending) {
      return
    }

    dispatchForm({
      type: 'SET_SUBMITTING',
      payload: false,
    })
  }, [formState.submitting, isPending])

  useEffect(() => {
    if (!actionState.success) {
      return
    }

    dispatchForm({ type: 'RESET' })
    dispatchForm({
      type: 'SET_SUCCESS',
      payload: true,
    })

    const timer = setTimeout(() => {
      dispatchForm({
        type: 'SET_SUCCESS',
        payload: false,
      })
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [actionState.success])

  const hasErrors = Object.keys(formState.errors).length > 0

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        width: '100%',
        p: 4,
        borderRadius: 2,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Форма с редюсером
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Форма для управления сложным состоянием с валидацией.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            {formState.success && actionState.success && (
              <Alert severity="success">✅ {actionState.message}</Alert>
            )}

            {actionState.message && !actionState.success && (
              <Alert severity="error">{actionState.message}</Alert>
            )}

            <TextField
              fullWidth
              name="name"
              label="Полное имя"
              placeholder="Иван Петров"
              value={formState.values.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              error={Boolean(formState.errors.name)}
              helperText={formState.errors.name}
              disabled={isPending}
              variant="outlined"
            />

            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              placeholder="ivan@example.com"
              value={formState.values.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              error={Boolean(formState.errors.email)}
              helperText={formState.errors.email}
              disabled={isPending}
              variant="outlined"
            />

            <TextField
              fullWidth
              name="description"
              label="Описание"
              placeholder="Расскажите о себе..."
              multiline
              rows={4}
              value={formState.values.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              error={Boolean(formState.errors.description)}
              helperText={formState.errors.description}
              disabled={isPending}
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isPending || !formState.dirty || hasErrors}
              sx={{
                py: 1.5,
                textTransform: 'none',
                fontSize: 'body1.fontSize',
              }}
            >
              {isPending ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={20} color="inherit" />
                  <span>Сохраняется...</span>
                </Stack>
              ) : (
                'Сохранить профиль'
              )}
            </Button>

            {formState.dirty && (
              <Typography variant="caption" color="text.secondary">
                * Форма имеет несохранённые изменения
              </Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}
