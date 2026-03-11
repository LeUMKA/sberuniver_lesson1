import type { EntityState } from '@reduxjs/toolkit'
import type { ITask } from 'entities/task'

export type TFilter = 'all' | 'completed' | 'incomplete'
export type TTaskListStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface ITaskListState extends EntityState<ITask, ITask['id']> {
  filter: TFilter
  status: TTaskListStatus
  error: string | null
  deletedTaskIds: ITask['id'][]
}

export interface ITaskListStoreSchema {
  taskList: ITaskListState
}
