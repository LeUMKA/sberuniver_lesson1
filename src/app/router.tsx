import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from 'pages/home'
import { TaskPage } from 'pages/tasks'
import { RefClassPage } from 'pages/refClassPage'
import { Navigation } from 'shared/ui/navigation/Navigation'
import { Box } from '@mui/material'
import { FormPage } from 'pages/form'

const RootLayout = () => (
  <Box>
    <Navigation />
    <HomePage title="Задачи на сегодня" content={<TaskPage />} />
  </Box>
)

const FormLayout = () => (
  <Box>
    <Navigation />
    <HomePage title="Форма для заполнения" content={<FormPage />} />
  </Box>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage title="Задачи на сегодня" content={<TaskPage />} />,
  },
  {
    path: '/ref',
    element: <HomePage title="Справочная страница" content={<RefClassPage />} />,
    element: <RootLayout />,
  },
  {
    path: '/form',
    element: <FormLayout />,
  },
])
