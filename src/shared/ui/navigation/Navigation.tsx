import { Link, useLocation } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import './Navigation.css'

export function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <Box component="nav" className="navigation">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant={isActive('/') ? 'contained' : 'text'} color="primary">
          Задачи
        </Button>
      </Link>
      <Link to="/form" style={{ textDecoration: 'none' }}>
        <Button variant={isActive('/form') ? 'contained' : 'text'} color="primary">
          Форма
        </Button>
      </Link>
    </Box>
  )
}
