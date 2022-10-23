import { ITasksDb } from './interfaces/tasks-db.interface';
import { Task } from './types/task';
import { randomUUID } from 'crypto';
import { TaskNotFoundError } from './errors/task-not-found.error';

const localDb: Record<string, Task> = {};

export class TasksDbLocal implements ITasksDb {
  private generateTaskId() {
    return randomUUID();
  }

  async queryAllTasks(): Promise<Task[]> {
    return Object.keys(localDb).map((taskId) => ({
      id: taskId,
      ...localDb[taskId],
    }));
  }

  async queryByTaskID(taskId: string): Promise<Task> {
    const foundTask = localDb[taskId];
    if (foundTask === undefined) {
      throw new TaskNotFoundError(taskId);
    }
    return foundTask;
  }

  async createTask(task: Pick<Task, 'title'>): Promise<Task> {
    const createdTask = {
      id: this.generateTaskId(),
      title: task.title,
      completed: false,
    };
    localDb[createdTask.id] = createdTask;
    return createdTask;
  }

  async updateTask(
    taskId: string,
    updateBody: Pick<Task, 'title'>,
  ): Promise<Task> {
    const foundTask = await this.queryByTaskID(taskId);
    localDb[taskId] = { ...foundTask, ...updateBody };
    return this.queryByTaskID(taskId);
  }
}
