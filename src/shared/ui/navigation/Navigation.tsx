import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { useAuth } from 'features/authRouting'
import './Navigation.css'

export function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/public', { replace: true })
  }

  return (
    <Box
      component="nav"
      className="navigation"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Link to="/app" style={{ textDecoration: 'none' }}>
          <Button variant={isActive('/app') ? 'contained' : 'text'} color="primary">
            Задачи
          </Button>
        </Link>
        <Link to="/app/form" style={{ textDecoration: 'none' }}>
          <Button variant={isActive('/app/form') ? 'contained' : 'text'} color="primary">
            Форма
          </Button>
        </Link>
        <Link to="/app/ref" style={{ textDecoration: 'none' }}>
          <Button variant={isActive('/app/ref') ? 'contained' : 'text'} color="primary">
            Примеры useRef
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        {isAuthenticated && (
          <>
            <Link to="/app/profile" style={{ textDecoration: 'none' }}>
              <Button variant={isActive('/app/profile') ? 'contained' : 'text'} color="primary">
                Профиль
              </Button>
            </Link>
            <Button variant="outlined" color="error" onClick={handleLogout} size="small">
              Выйти
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

