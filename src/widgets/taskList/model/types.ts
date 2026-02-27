import type { ITask } from "entities/task";

export type TFilter = 'all' | 'completed' | 'incomplete';

export type TUseTasksRurnType = {
  filteredTasks: ITask[];
  filter: TFilter;
  setFilter: (f: TFilter) => void;
  removeTask: (id: string) => void;
}