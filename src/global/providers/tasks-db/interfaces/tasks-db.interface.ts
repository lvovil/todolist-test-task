import { Task } from '../types/task';

export interface ITasksDb {
  queryByTaskID: (taskId: string) => Promise<Task | null>;
  queryAllTasks: () => Promise<Task[]>;
  updateTask: (
    taskId: string,
    updateBody: Partial<Omit<Task, 'id'>>,
  ) => Promise<Task>;
  createTask: (task: Pick<Task, 'title'>) => Promise<Task>;
}
