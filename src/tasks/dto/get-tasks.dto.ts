import {Task} from "../../global/providers/tasks-db/types/task";

export type GetTasksResponseV1 = {
  tasks: Task[];
};
