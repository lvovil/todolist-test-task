export class TaskNotFoundError extends Error {
  private details: Record<string, any>;

  constructor(taskId: string) {
    super('Task was not found');
    this.details = {
      taskId,
    };
  }
}
