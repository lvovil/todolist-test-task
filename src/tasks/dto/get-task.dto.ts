import { Task } from '../../global/providers/tasks-db/types/task';

export type GetTaskQueryV1 = {
  id: string;
};

export type GetTaskResponseV1 = {
  task: Task;
};
