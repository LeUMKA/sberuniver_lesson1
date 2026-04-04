import type { ReactElement } from 'react'
import { HomePage } from 'pages/home'
import { TaskPage } from 'pages/tasks'
import { RefClassPage } from 'pages/refClassPage'

export type AppRoute = {
  path: string
  element: ReactElement
}

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <HomePage title="Задачи на сегодня" content={<TaskPage />} />,
  },
  {
    path: '/ref',
    element: <HomePage title="Справочная страница" content={<RefClassPage />} />,
  },
]
