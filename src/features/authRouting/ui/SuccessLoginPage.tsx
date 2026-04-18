import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, Typography, Checkbox, FormControlLabel, Alert } from '@mui/material'
import { useAuth } from '../model/useAuth'
import { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function SuccessLoginPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Завершить задание по аутентификации', completed: false },
    { id: 2, text: 'Изучить Protected Routes', completed: false },
    { id: 3, text: 'Протестировать вход и выход', completed: false },
    { id: 4, text: 'Проверить восстановление при F5', completed: false },
  ])

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', p: 4 }}>
        {/* Success header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{ fontSize: 64, mb: 1 }}>
            ✅
          </Typography>
          <Typography variant="h4" sx={{ mb: 1, color: 'success.main' }}>
            Добро пожаловать, {user?.name || user?.email}!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Вы успешно вошли в систему
          </Typography>
        </Box>

        {/* User info */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Email:</strong> {user?.email}
          <br />
          <strong>ID:</strong> {user?.id}
        </Alert>

        {/* Todo demo */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📋 Ваши задачи ({completedCount}/{todos.length})
          </Typography>

          <Box sx={{ backgroundColor: '#fafafa', p: 2, borderRadius: 1 }}>
            {todos.map((todo) => (
              <FormControlLabel
                key={todo.id}
                control={
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                }
                label={
                  <Typography
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'text.secondary' : 'text.primary',
                    }}
                  >
                    {todo.text}
                  </Typography>
                }
                sx={{ display: 'block', mb: 1 }}
              />
            ))}
          </Box>
        </Box>

        {/* Next steps */}
        <Alert severity="success" sx={{ mb: 3 }}>
          💡 <strong>Что дальше?</strong>
          <br />
          Нажмите кнопку ниже чтобы перейти в полный профиль
        </Alert>

        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/app/profile', { replace: true })}
            fullWidth
          >
            → Перейти в профиль
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/public', { replace: true })}
            fullWidth
          >
            ← Назад на главную
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
