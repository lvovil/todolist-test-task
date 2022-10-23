import { Task } from '../../global/providers/tasks-db/types/task';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskBodyV1 {
  @ApiProperty()
  title: string;
}

export type CreateTaskResponseV1 = {
  task: Task;
};
