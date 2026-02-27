import { Container, Paper, Stack } from '@mui/material'
import { TaskWidget } from 'widgets/taskList'

export function TaskPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>

        <Paper elevation={4} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
          <TaskWidget
            tasks={[
              { id: '1', title: 'Задача 1', completed: false },
              { id: '2', title: 'Задача 2', completed: true },
              { id: '3', title: 'Подготовить демо', completed: false },
            ]}
          />
        </Paper>
      </Stack>
    </Container>
  )
}
