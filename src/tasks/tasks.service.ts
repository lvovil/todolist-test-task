import { Inject, Injectable } from '@nestjs/common';
import { ITasksService } from './interfaces/tasks-service.interface';
import { ITasksDb } from '../global/providers/tasks-db/interfaces/tasks-db.interface';
import { Task } from '../global/providers/tasks-db/types/task';
import { LoggerService } from '../global/providers/logger-service/logger.service';

@Injectable()
export class TasksService implements ITasksService {
  constructor(
    @Inject('ITasksDb') private readonly tasksDB: ITasksDb,
    @Inject('LoggerService') private readonly loggerService: LoggerService,
  ) {}

  async getTaskById(taskId: string): Promise<Task> {
    return this.tasksDB.queryByTaskID(taskId);
  }

  async getTasks(): Promise<Task[]> {
    return this.tasksDB.queryAllTasks();
  }

  async editTask(
    taskId: string,
    payload: Partial<Omit<Task, 'id'>>,
  ): Promise<Task> {
    this.loggerService.debug({
      message: 'Payload for update',
      details: { payload },
    });
    return this.tasksDB.updateTask(taskId, payload);
  }

  async createTask(taskParams: Pick<Task, 'title'>): Promise<Task> {
    return this.tasksDB.createTask({ title: taskParams.title });
  }

  async completeTask(taskId: string): Promise<void> {
    await this.editTask(taskId, { completed: true });
  }
}
