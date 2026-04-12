import { Box, Card, Typography, Button, Container } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../model/useAuth'

export function PublicPage() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh', py: 4 }}>
      <Card sx={{ width: '100%', p: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          📱 SberuUniverse
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', color: 'text.secondary' }}>
          {isAuthenticated
            ? `Добро пожаловать, ${user?.name}! 👋`
            : 'Приложение для управления задачами и формами'}
        </Typography>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/app', { replace: true })}
            >
              → Перейти в приложение
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/app/profile')}
            >
              👤 Мой профиль
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexDirection: 'column' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/login"
            >
              🔐 Войти
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={Link}
              to="/register"
            >
              📝 Зарегистрироваться
            </Button>
          </Box>
        )}
      </Card>
    </Container>
  )
}
