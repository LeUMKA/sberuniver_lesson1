import type { ReactElement } from 'react'
import { TaskPage } from 'pages/tasks/ui/TaskPage'
import { HomePage } from 'pages/home'

export type AppRoute = {
  path: string
  element: ReactElement
}

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <HomePage title='Задачи на сегодня' content={<TaskPage />}  />,
  },
  // {
  //   path: '/taskList',
  //   element: <TaskList />,
  // },
]
