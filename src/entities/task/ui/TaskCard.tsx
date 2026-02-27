import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import {CheckCircle, IndeterminateCheckBox} from '@mui/icons-material';
import type { ITask } from '../model/types'

type TaskCardProps = ITask & { onClick: () => void }

export const TaskCard = (props: TaskCardProps) => {
  const { title, completed, onClick } = props

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            {completed ? <CheckCircle /> : <IndeterminateCheckBox />}
            <Stack spacing={0.5}>
              <Typography
                variant="subtitle1"
                sx={{ textDecoration: completed ? 'line-through' : 'none' }}
              >
                {title}
              </Typography>
            </Stack>
          </Stack>

          <CardActions sx={{ p: 0 }}>
            <Button variant="outlined" color="error" size="small" onClick={onClick}>
              Удалить
            </Button>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  )
}
