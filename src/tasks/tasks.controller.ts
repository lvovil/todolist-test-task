import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { GetTaskQueryV1, GetTaskResponseV1 } from './dto/get-task.dto';
import {
  PatchTaskBodyV1,
  PatchTaskQueryV1,
  PatchTaskResponseV1,
} from './dto/patch-task.dto';
import { GetTasksResponseV1 } from './dto/get-tasks.dto';
import { CreateTaskBodyV1, CreateTaskResponseV1 } from './dto/create-task.dto';
import { ITasksService } from './interfaces/tasks-service.interface';
import { TasksErrorInterceptor } from './tasks.interceptor';
import { CompleteTaskQueryV1 } from './dto/complete-task.dto';

@UseInterceptors(TasksErrorInterceptor)
@Controller()
export class TasksController {
  constructor(
    @Inject('ITasksService') private readonly tasksService: ITasksService,
  ) {}

  @Get('/v1/task/:id')
  async getTaskById(
    @Param() params: GetTaskQueryV1,
  ): Promise<GetTaskResponseV1> {
    return { task: await this.tasksService.getTaskById(params.id) };
  }

  @Get('/v1/tasks')
  async getTasks(): Promise<GetTasksResponseV1> {
    return { tasks: await this.tasksService.getTasks() };
  }

  @Patch('/v1/task/:id')
  async editTask(
    @Param() params: PatchTaskQueryV1,
    @Body() body: PatchTaskBodyV1,
  ): Promise<PatchTaskResponseV1> {
    return {
      task: await this.tasksService.editTask(params.id, body),
    };
  }

  @Post('/v1/task')
  async createTask(
    @Body() body: CreateTaskBodyV1,
  ): Promise<CreateTaskResponseV1> {
    return { task: await this.tasksService.createTask({ title: body.title }) };
  }

  @Patch('/v1/task/:id/complete')
  async completeTask(@Param() params: CompleteTaskQueryV1): Promise<void> {
    await this.tasksService.completeTask(params.id);
  }
}
