import { configureStore } from '@reduxjs/toolkit'
import { tasksApi } from 'entities/task'
import { taskListReducer } from 'features/taskList'

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    taskList: taskListReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
