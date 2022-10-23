import { Task } from '../../global/providers/tasks-db/types/task';
import { ApiProperty } from '@nestjs/swagger';

export type PatchTaskQueryV1 = {
  id: string;
};

// export type PatchTaskBodyV1 = Partial<Pick<Task, 'title'>>;
export class PatchTaskBodyV1 {
  @ApiProperty()
  title!: string;
}

export type PatchTaskResponseV1 = {
  task: Task;
};
