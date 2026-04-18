import { startTransition, useOptimistic, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import type { ITodo, ITodoListState } from '../model/types'

const initialState: ITodoListState = {
  todos: [
    {
      id: '1',
      text: 'Изучить useOptimistic в React 19',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      text: 'Освоить асинхронные обновления состояния',
      completed: false,
      createdAt: new Date(),
    },
  ],
  status: 'idle',
  error: undefined,
}

async function addTodoServer(todo: ITodo): Promise<ITodo> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return todo
}

async function toggleTodoServer(id: string): Promise<void> {
  void id
  await new Promise((resolve) => setTimeout(resolve, 1200))
}

async function deleteTodoServer(id: string): Promise<void> {
  void id
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

export const TodoListOptimistic = () => {
  const [state, setState] = useState<ITodoListState>(initialState)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string>()

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    state.todos,
    (todos: ITodo[], newTodo: ITodo) => {
      return [...todos, newTodo]
    },
  )

  const displayTodos = optimisticTodos

  const handleAddTodo = async () => {
    if (!inputValue.trim()) return

    const newTodo: ITodo = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
      createdAt: new Date(),
    }

    startTransition(() => {
      addOptimisticTodo(newTodo)
    })

    setInputValue('')
    setError(undefined)

    try {
      const savedTodo = await addTodoServer(newTodo)

      setState((prev) => ({
        ...prev,
        todos: [...prev.todos, savedTodo],
      }))
    } catch (err) {
      setError('Ошибка при добавлении задачи. Попробуйте ещё раз.')
    }
  }

  const handleToggleTodo = async (id: string) => {
    try {
      await toggleTodoServer(id)

      setState((prev) => ({
        ...prev,
        todos: prev.todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        ),
      }))
    } catch (err) {
      setError('Ошибка при обновлении задачи.')
    }
  }

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodoServer(id)

      setState((prev) => ({
        ...prev,
        todos: prev.todos.filter((t) => t.id !== id),
      }))
    } catch (err) {
      setError('Ошибка при удалении задачи.')
    }
  }

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
          Список задач с оптимистичными обновлениями
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Добавляйте, отмечайте завершённые и удаляйте задачи.
        </Typography>

        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Добавить новую задачу..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTodo()
              }
            }}
            disabled={state.status === 'loading'}
          />
          <Button
            variant="contained"
            onClick={handleAddTodo}
            disabled={!inputValue.trim() || state.status === 'loading'}
            sx={{ px: 2 }}
          >
            <AddIcon />
          </Button>
        </Stack>

        {error && (
          <Box
            sx={{
              p: 2,
              bgcolor: 'error.light',
              color: 'error.main',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'error.main',
            }}
          >
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}

        <List
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.paper',
          }}
        >
          {displayTodos.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="Задач нет. Добавьте первую задачу!"
                primaryTypographyProps={{
                  variant: 'body2',
                  color: 'text.secondary',
                  textAlign: 'center',
                }}
              />
            </ListItem>
          ) : (
            displayTodos.map((todo) => (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="удалить"
                    onClick={() => handleDeleteTodo(todo.id)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  onClick={() => handleToggleTodo(todo.id)}
                  role={undefined}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={todo.text}
                    primaryTypographyProps={{
                      sx: {
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'text.secondary' : 'text.primary',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Stack>
    </Paper>
  )
}
