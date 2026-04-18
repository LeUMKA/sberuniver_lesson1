import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from 'pages/home'
import { TaskPage } from 'pages/tasks'
import { RefClassPage } from 'pages/refClassPage'
import { Navigation } from 'shared/ui/navigation/Navigation'
import { Box } from '@mui/material'
import { FormPage } from 'pages/form'
import { PortalShowcase } from 'pages/portal-showcase'
import {
  LoginPage,
  RegisterPage,
  ProfilePage,
  PublicPage,
  ProtectedRoute,
  SuccessLoginPage,
  SuccessRegisterPage,
} from 'features/authRouting'

interface ILayoutWithNavigation {
  component: React.ReactElement
  title: string
}

const LayoutWithNavigation = ({ component, title }: ILayoutWithNavigation) => (
  <Box>
    <Navigation />
    <HomePage title={title} content={component} />
  </Box>
)

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/success-login',
    element: <SuccessLoginPage />,
  },
  {
    path: '/success-register',
    element: <SuccessRegisterPage />,
  },

  {
    path: '/public',
    element: <PublicPage />,
  },

  {
    path: '/',
    element: <Navigate to="/public" replace />,
  },

  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <LayoutWithNavigation component={<TaskPage />} title="Задачи на сегодня" />,
      },
      {
        path: 'profile',
        element: <LayoutWithNavigation component={<ProfilePage />} title="Профиль" />,
      },
      {
        path: 'form',
        element: <LayoutWithNavigation component={<FormPage />} title="Форма для заполнения" />,
      },
      {
        path: 'ref',
        element: <LayoutWithNavigation component={<RefClassPage />} title="Практика по useRef" />,
      },
      {
        path: 'portal',
        element: <LayoutWithNavigation component={<PortalShowcase />} title="Практика по React Portal" />,
      },
    ],
  },
])
