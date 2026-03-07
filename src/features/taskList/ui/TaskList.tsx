import { FormControl, Stack, Typography } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import { useAppDispatch, useAppSelector } from 'app'
import { TaskCard, type ITask } from 'entities/task'
import { useCallback } from 'react'
import { FilterButton } from 'shared'
import { removeTask, selectFilteredTasks, selectTaskFilter, setFilter } from '../model/taskListSlice'
import type { TFilter } from '../model/types'

const menuItems = [
  { value: 'all', label: 'Все' },
  { value: 'completed', label: 'Завершённые' },
  { value: 'incomplete', label: 'Незавершённые' },
]

export const TaskList = () => {
  const dispatch = useAppDispatch()
  const filteredTasks = useAppSelector(selectFilteredTasks)
  const filter = useAppSelector(selectTaskFilter)

  const handleFilterChange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(setFilter(event.target.value as TFilter))
    },
    [dispatch],
  )

  const handleRemoveTask = useCallback(
    (id: ITask['id']) => {
      dispatch(removeTask(id))
    },
    [dispatch],
  )

  return (
    <Stack spacing={2.5}>
      <FormControl size="small" sx={{ maxWidth: 240 }}>
        <FilterButton
          filter={filter}
          onChange={handleFilterChange}
          menuItems={menuItems}
          stateLabel="Status"
        />
      </FormControl>

      {filteredTasks.length ? (
        <Stack spacing={1.5}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              todo={task.todo}
              completed={task.completed}
              onRemove={handleRemoveTask}
            />
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">Задачи не найдены</Typography>
      )}
    </Stack>
  )
}
