import {
  createEntityAdapter,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { tasksApi, type ITask } from 'entities/task'
import type { ITaskListState, ITaskListStoreSchema, TFilter } from './types'

const tasksAdapter = createEntityAdapter<ITask>()

const initialState: ITaskListState = tasksAdapter.getInitialState({
  filter: 'all',
  status: 'idle',
  error: null,
  deletedTaskIds: [],
})

const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TFilter>) => {
      state.filter = action.payload
    },
    removeTask: (state, action: PayloadAction<ITask['id']>) => {
      if (!state.deletedTaskIds.includes(action.payload)) {
        state.deletedTaskIds.push(action.payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(tasksApi.endpoints.getTasks.matchPending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addMatcher(tasksApi.endpoints.getTasks.matchFulfilled, (state, action) => {
        state.status = 'succeeded'
        tasksAdapter.setAll(state, action.payload)
      })
      .addMatcher(tasksApi.endpoints.getTasks.matchRejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load tasks'
      })
  },
})

const selectTaskListState = (state: ITaskListStoreSchema) => state.taskList
const taskSelectors = tasksAdapter.getSelectors(selectTaskListState)

export const selectTaskFilter = createSelector(selectTaskListState, (state) => state.filter)
export const selectTaskListStatus = createSelector(selectTaskListState, (state) => state.status)
export const selectTaskListError = createSelector(selectTaskListState, (state) => state.error)
const selectDeletedTaskIds = createSelector(selectTaskListState, (state) => state.deletedTaskIds)

export const selectFilteredTasks = createSelector(
  [taskSelectors.selectAll, selectTaskFilter, selectDeletedTaskIds],
  (tasks, filter, deletedTaskIds) => {
    const deletedTaskIdsSet = new Set(deletedTaskIds)
    const visibleTasks = tasks.filter((task) => !deletedTaskIdsSet.has(task.id))

    if (filter === 'completed') {
      return visibleTasks.filter((task) => task.completed)
    }

    if (filter === 'incomplete') {
      return visibleTasks.filter((task) => !task.completed)
    }

    return visibleTasks
  },
)

export const { setFilter, removeTask } = taskListSlice.actions
export const taskListReducer = taskListSlice.reducer
