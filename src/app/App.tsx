import { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import { routes } from './router'

export function App() {
  const [currentPath, setCurrentPath] = useState('/')

  const currentRoute = routes.find((route) => route.path === currentPath)

  const handleTabChange = (_event: React.SyntheticEvent, newPath: string) => {
    setCurrentPath(newPath)
  }

  return (
    <div className="app">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentPath} onChange={handleTabChange}>
          {routes.map((route) => (
            <Tab
              key={route.path}
              label={route.path === '/' ? 'Задачи' : 'useRef примеры'}
              value={route.path}
            />
          ))}
        </Tabs>
      </Box>
      <Box>{currentRoute?.element}</Box>
    </div>
  )
}
