import { Task } from '../../global/providers/tasks-db/types/task';

export interface ITasksService {
  getTaskById: (taskId: string) => Promise<Task>;
  getTasks: () => Promise<Task[]>;
  editTask: (
    taskId: string,
    payload: Partial<Omit<Task, 'id'>>,
  ) => Promise<Task>;
  createTask: (payload: Pick<Task, 'title'>) => Promise<Task>;
  completeTask: (taskId: string) => Promise<void>;
}
