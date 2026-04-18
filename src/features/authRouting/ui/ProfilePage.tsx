import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, Typography } from '@mui/material'
import { useAuth } from '../model/useAuth'

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          👤 Профиль пользователя
        </Typography>

        {user && (
          <Box sx={{ mb: 3, backgroundColor: '#f5f5f5', p: 2, borderRadius: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>📋 ID:</strong> {user.id}
            </Typography>
            {user.name && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>👤 Имя:</strong> {user.name}
              </Typography>
            )}
            <Typography variant="body1">
              <strong>📧 Email:</strong> {user.email}
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          fullWidth
        >
          🚪 Выйти
        </Button>
      </Card>
    </Box>
  )
}
