import type { ITask } from "entities/task";
import { useState } from "react";
import type { TFilter, TUseTasksRurnType } from "../model/types";



export function useTasks(initial: ITask[]): TUseTasksRurnType {
  const [tasks, setTasks] = useState(initial);
  const [filter, setFilter] = useState<TFilter>('all');

  const filteredTasks: ITask[] = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return task;
  });

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return { filteredTasks, filter, setFilter, removeTask };
}
