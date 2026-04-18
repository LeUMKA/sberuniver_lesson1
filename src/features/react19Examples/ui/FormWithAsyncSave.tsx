import { useActionState } from 'react'
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
import type { IFormState } from '../model/types'

const initialState: IFormState = {
  message: '',
  status: 'idle',
  error: undefined,
  savedAt: undefined,
}

async function submitFormAction(
  _prevState: IFormState,
  formData: FormData,
): Promise<IFormState> {
  // Extract form data
  const message = formData.get('message') as string

  if (!message.trim()) {
    return {
      ..._prevState,
      status: 'idle',
      error: 'Message cannot be empty',
    }
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      message,
      status: 'success',
      error: undefined,
      savedAt: new Date(),
    }
  } catch (err) {
    return {
      ..._prevState,
      status: 'idle',
      error: 'Failed to save. Please try again.',
    }
  }
}

export const FormWithAsyncSave = () => {
  const [state, formAction, isPending] = useActionState(submitFormAction, initialState)

  const getStatusMessage = () => {
    switch (state.status) {
      case 'saving':
        return 'Сохраняется...'
      case 'success':
        return `✅ Сохранено в ${state.savedAt?.toLocaleTimeString()}`
      case 'idle':
        return state.error || 'Готово к сохранению'
    }
  }

  const getStatusColor = (): 'success' | 'error' | 'info' => {
    switch (state.status) {
      case 'saving':
        return 'info'
      case 'success':
        return 'success'
      case 'idle':
        return state.error ? 'error' : 'info'
      default:
        return 'info'
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 500,
        width: '100%',
        p: 4,
        borderRadius: 2,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          Форма с асинхронным сохранением
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Форма для сохранения данных с использованием асинхронных операций.
        </Typography>

        <Box component="form" action={formAction} noValidate>
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="message"
              label="Сообщение"
              placeholder="Введите сообщение для сохранения..."
              multiline
              rows={4}
              variant="outlined"
              disabled={isPending}
              defaultValue={state.message}
              slotProps={{
                input: {
                  'aria-label': 'message input',
                },
              }}
            />

            <Alert severity={getStatusColor()}>
              {isPending ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={20} />
                  <Typography>Сохраняется...</Typography>
                </Stack>
              ) : (
                getStatusMessage()
              )}
            </Alert>

            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              sx={{
                py: 1.5,
                textTransform: 'none',
                fontSize: 'body1.fontSize',
              }}
            >
              {isPending ? 'Сохраняется...' : 'Сохранить сообщение'}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}
