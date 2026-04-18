import { Box, Container, Stack, Typography } from '@mui/material'
import {
  ActionStateWithReducer,
  FormWithAsyncSave,
  TodoListOptimistic,
} from 'features/react19Examples'

export const React19ExamplesPage = () => {
  return (
    <Container maxWidth="lg">
      <Stack spacing={6} sx={{ py: 6 }}>

        <Box>
          <Typography variant="h5" component="h2" fontWeight="bold" mb={2}>
            1. useActionState: Форма с асинхронным сохранением
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Демонстрирует использование <code>useActionState</code> для обработки отправки
            формы с автоматическим состоянием загрузки.
          </Typography>
          <FormWithAsyncSave />
        </Box>

        <Box>
          <Typography variant="h5" component="h2" fontWeight="bold" mb={2}>
            2. useOptimistic: Список задач с оптимистичными обновлениями
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Показывает, как <code>useOptimistic</code> позволяет мгновенно отображать
            новую задачу, пока запрос выполняется в фоне.
          </Typography>
          <TodoListOptimistic />
        </Box>

        <Box>
          <Typography variant="h5" component="h2" fontWeight="bold" mb={2}>
            3. useActionState + useReducer: Продвинутая форма
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Объединяет <code>useActionState</code> и <code>useReducer</code> для сложной
            формы с валидацией и контролем состояния.
          </Typography>
          <ActionStateWithReducer />
        </Box>
      </Stack>
    </Container>
  )
}
