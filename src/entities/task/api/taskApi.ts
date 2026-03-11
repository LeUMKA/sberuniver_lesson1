import { baseApi } from 'shared'
import type { ITask } from '../model/types'

type TTasksResponse = {
  todos: ITask[]
}

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<ITask[], void>({
      query: () => 'todos',
      transformResponse: (response: TTasksResponse) => response.todos,
      providesTags: ['Tasks'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetTasksQuery } = tasksApi
