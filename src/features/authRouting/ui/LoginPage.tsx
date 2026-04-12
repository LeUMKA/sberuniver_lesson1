import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, TextField, Card, Alert, CircularProgress, Divider } from '@mui/material'
import { useAuth } from '../model/useAuth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!email || !password) {
      setLocalError('Email и пароль обязательны')
      return
    }

    try {
      await login(email, password)
      navigate('/success-login', { replace: true })
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
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', p: 3 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Вход в систему</h2>

        {displayError && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              backgroundColor: '#ffebee',
              borderLeft: '4px solid #d32f2f'
            }}
            onClose={() => setLocalError('')}
          >
            <Box sx={{ mb: 2 }}>
              <strong>❌ Ошибка входа</strong>
              <br />
              {displayError}
            </Box>
            <Button
              variant="contained"
              color="error"
              size="small"
              fullWidth
              onClick={() => navigate('/register')}
            >
              → Создать новый аккаунт
            </Button>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            disabled={isLoading}
            placeholder="your@email.com"
            error={!!displayError}
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            disabled={isLoading}
            placeholder="password"
            error={!!displayError}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3, mb: 1 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Войти'}
          </Button>
        </form>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate('/public', { replace: true })}
            fullWidth
          >
            ← Назад
          </Button>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/register"
            fullWidth
          >
            📝 Регистрация
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
