import {
  FormControl,
  Stack,
  Typography,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import { TaskCard, type ITask } from 'entities/task'
import { useTasks } from '../hooks/useTasks'
import type { TFilter } from '../model/types'
import { FilterButton } from './buttons/FilterButton'

type TaskListProps = {
  tasks: ITask[]
}

export const TaskList = ({ tasks }: TaskListProps) => {
  const { filteredTasks, filter, setFilter, removeTask } = useTasks(tasks)

  const menuItems = [
    { value: 'all', label: 'Все' },
    { value: 'completed', label: 'Завершённые' },
    { value: 'incomplete', label: 'Незавершённые' },
  ]

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as TFilter)
  }

  return (
    <Stack spacing={2.5}>
      <FormControl size="small" sx={{ maxWidth: 240 }}>
        <FilterButton
          filter={filter}
          onChange={handleFilterChange}
          menuItems={menuItems}
          stateLabel="Статус"
        />
      </FormControl>

      {filteredTasks.length ? (
        <Stack spacing={1.5}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              completed={task.completed}
              id={task.id}
              onClick={() => removeTask(task.id)}
            />
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">Задач нет</Typography>
      )}
    </Stack>
  )
}
