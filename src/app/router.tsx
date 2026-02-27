import type { ReactElement } from 'react'
import { HomePage } from 'pages/home'
import { TaskPage } from 'pages/tasks'

export type AppRoute = {
  path: string
  element: ReactElement
}

export const routes: AppRoute[] = [
  {
    path: '/',
    element: (
      <HomePage title="Задачи на сегодня" content={<TaskPage  />} />
    ),
  },
]
