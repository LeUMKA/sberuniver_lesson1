import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, Typography, Alert, Divider } from '@mui/material'
import { useAuth } from '../model/useAuth'

export function SuccessRegisterPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

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
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{ fontSize: 64, mb: 1 }}>
            🎉
          </Typography>
          <Typography variant="h4" sx={{ mb: 1, color: 'success.main' }}>
            Регистрация успешна!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Ваш аккаунт создан: <strong>{user?.name || user?.email}</strong>
          </Typography>
        </Box>

        {/* User info */}
        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>✓ Аккаунт создан:</strong>
          <br />
          Email: <strong>{user?.email}</strong>
          <br />
          {user?.name && (
            <>
              Имя: <strong>{user.name}</strong>
              <br />
            </>
          )}
          ID: <strong>{user?.id}</strong>
        </Alert>

        <Divider sx={{ my: 2 }} />

        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => navigate('/app/profile', { replace: true })}
            fullWidth
          >
            ✓ Перейти в профиль
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/login', { replace: true })}
            fullWidth
          >
            ← Перейти ко входу
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => navigate('/public', { replace: true })}
            fullWidth
            size="small"
          >
            Главная
          </Button>
        </Box>

      </Card>
    </Box>
  )
}
