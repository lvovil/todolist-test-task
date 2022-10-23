import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskNotFoundError } from '../global/providers/tasks-db/errors/task-not-found.error';
import { LoggerService } from '../global/providers/logger-service/logger.service';

export class TasksErrorInterceptor implements NestInterceptor {
  constructor(
    @Inject('LoggerService') private readonly loggerService: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: Error): never => {
        if (error instanceof TaskNotFoundError) {
          throw new HttpException(error.message, 404);
        }

        this.loggerService.error({
          message: 'Unexpected error happened',
          details: {
            stacktrace: error.stack,
            message: error.message,
            name: error.name,
          },
        });
        throw new HttpException('Unexpected error happened', 500);
      }),
    );
  }
}
