# ToDo List Test Task
The app is a server side application that implemented with NodeJS + NestJS.
## How to run

1. Build docker image
```shell
docker build . --tag todo-test
```

2. Run the built image
```shell
docker run -p 8000:8000 todo-test
```

## How to run tests

1. Install `node` v16 (depending on OS you use, please check the [official documentation](https://nodejs.org/en/download/))
2. Install `npm` (depending on OS you use, please check the [official documentation](https://docs.npmjs.com/cli/v7/configuring-npm/install))
3. In you terminal go to root directory of the project
```shell
cd /path/to/test-task-aidance
```
4. Execute the following command to install packages:
```shell
npm i
```
4. Execute the following command to run the only test that was implemented 🙂:
```shell
npm run test:e2e
```

## API

After you ran the application in docker container, you can check http://localhost:8000/api for API spec.

## Potential improvements
Basically, because it's just a test task it doesn't have a lot of things to be ready for production:

1. Proper logging
2. Metrics collection
3. Configuration for different envs
4. Proper DB client (just stores tasks in a memory because it was allowed by the task description)
5. Unit, integration tests 
6. Requests validation
7. Some edge cases might be not covered
8. Auth
9. etc etc