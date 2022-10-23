import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as supertest from 'supertest';
import { AppModule } from '../src/app.module';
import { Task } from '../src/global/providers/tasks-db/types/task';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let request;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    request = supertest(app.getHttpServer());
    await app.init();
  });

  it('e2e test', async () => {
    const title = 'test task';

    // create a task
    const createTaskResponse = await request.post('/v1/task').send({ title });

    expect(createTaskResponse.statusCode).toEqual(201);
    expect(createTaskResponse.body).toEqual({
      task: { id: expect.any(String), title, completed: false },
    });

    const createdTask: Task = createTaskResponse.body.task;

    // complete the task
    const competeTaskResponse = await request
      .patch(`/v1/task/${createdTask.id}`)
      .send();

    expect(competeTaskResponse.statusCode).toEqual(200);
  });
});
