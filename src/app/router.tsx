import { createBrowserRouter, Navigate } from 'react-router-dom'
import { HomePage } from 'pages/home'
import { TaskPage } from 'pages/tasks'
import { RefClassPage } from 'pages/refClassPage'
import { Navigation } from 'shared/ui/navigation/Navigation'
import { Box } from '@mui/material'
import { FormPage } from 'pages/form'
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
  // ============ PUBLIC AUTH ROUTES (without Navigation) ============
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

  // ============ PUBLIC PAGE (without Navigation) ============
  {
    path: '/public',
    element: <PublicPage />,
  },

  // ============ DEFAULT / → redirect to /public ============
  {
    path: '/',
    element: <Navigate to="/public" replace />,
  },

  // ============ PROTECTED ROUTES (with Navigation + ProtectedRoute guard) ============
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
    ],
  },
])
