import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import { CheckCircle, IndeterminateCheckBox } from '@mui/icons-material'
import { memo, useCallback } from 'react'
import type { ITask } from '../model/types'
import DeleteIcon from '@mui/icons-material/Delete'

type TProps = Pick<ITask, 'id' | 'todo' | 'completed'> & {
  onRemove: (id: ITask['id']) => void
}

export const TaskCard = memo((props: TProps) => {
  const { id, todo, completed, onRemove } = props

  const handleRemove = useCallback(() => {
    onRemove(id)
  }, [id, onRemove])

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
                {todo}
              </Typography>
            </Stack>
          </Stack>

          <CardActions sx={{ p: 0 }}>
            <Button variant="outlined" color="error" size="small" onClick={handleRemove}>
              <DeleteIcon />
            </Button>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  )
})
