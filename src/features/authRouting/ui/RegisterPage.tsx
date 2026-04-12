import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, TextField, Card, Alert, CircularProgress } from '@mui/material'
import { useAuth } from '../model/useAuth'

export function RegisterPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState('')
  const navigate = useNavigate()
  const { register, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!email || !password || !name || !confirmPassword) {
      setLocalError('Все поля обязательны')
      return
    }

    if (password !== confirmPassword) {
      setLocalError('Пароли не совпадают')
      return
    }

    if (password.length < 3) {
      setLocalError('Пароль должен быть не менее 3 символов')
      return
    }

    try {
      await register(email, password, name)
      navigate('/success-register', { replace: true })
    } catch {
      // Error is handled by context
    }
  }

  const displayError = error || localError

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', p: 3 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Регистрация</h2>

        {displayError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {displayError}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Имя"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Подтвердите пароль"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            disabled={isLoading}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
          </Button>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <p>
            Уже есть аккаунт?{' '}
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Войти
            </Link>
          </p>
        </Box>
      </Card>
    </Box>
  )
}
