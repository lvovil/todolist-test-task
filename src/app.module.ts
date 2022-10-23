import { Module } from '@nestjs/common';
import { GlobalModule } from './global/global.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [GlobalModule, TasksModule],
})
export class AppModule {}
