import { Global, Module } from '@nestjs/common';
import { TasksDbLocal } from './providers/tasks-db/tasks-db-local.service';
import { LoggerService } from './providers/logger-service/logger.service';

@Global()
@Module({
  providers: [
    { provide: 'ITasksDb', useClass: TasksDbLocal },
    { provide: 'LoggerService', useClass: LoggerService },
  ],
  exports: ['ITasksDb', 'LoggerService'],
})
export class GlobalModule {}
