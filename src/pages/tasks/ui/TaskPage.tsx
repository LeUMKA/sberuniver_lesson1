import { Alert, Container, Paper, Skeleton, Stack } from '@mui/material'
import { useAppSelector } from 'app'
import { useGetTasksQuery } from 'entities/task'
import {
  TaskList,
  selectTaskListError,
  selectTaskListStatus,
} from 'features/taskList'

export function TaskPage() {
  useGetTasksQuery()

  const status = useAppSelector(selectTaskListStatus)
  const error = useAppSelector(selectTaskListError)

  const isLoading = status === 'idle' || status === 'loading'

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Paper elevation={4} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={210} height={60} />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TaskList />
          )}
        </Paper>
      </Stack>
    </Container>
  )
}
