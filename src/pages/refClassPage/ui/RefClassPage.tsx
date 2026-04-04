import { Container, Paper, Stack, Typography } from '@mui/material'
import {
  ClickTimer,
  PreviousInput,
  FocusTracker,
  DebouncedLogger,
  WebSocketLogger,
} from 'features/refExamples'

export const RefClassPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
          Примеры useRef в React
        </Typography>

        <Paper elevation={4} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
          <ClickTimer />
        </Paper>

        <Paper elevation={4} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
          <PreviousInput />
        </Paper>

        <Paper elevation={4} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
          <FocusTracker />
        </Paper>

        <Paper elevation={4} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
          <DebouncedLogger />
        </Paper>

        <Paper elevation={4} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
          <WebSocketLogger />
        </Paper>
      </Stack>
    </Container>
  )
}
