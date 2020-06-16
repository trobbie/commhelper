# Commhelper

Community helper is intended to aid community coordinators in organizing their helper participation.  Further details are explained in the Project's [Wiki](https://github.com/trobbie/commhelper/wiki).

It is currently under construction in early stages of development.

## Components (Current and Planned)
| Name         | Technologies |   Dev Env   | Staging Env
|--------------|--------------|-------------|-------------|
| Frontend Web | Node, Angular 7 | Localhost | AWS S3?
| WEB API      | REST, AWS DynamoDB SDK | Localhost | AWS Lambda?
| DB           | NoSQL, AWS DynamoDB Local | Localhost | AWS DynamoDB?

See below for unit and integration testing.  CircleCI is used for CI/CD, triggered on GIT commits.

## Development Environment Setup

1. Software requirements:
   1. Linux/MacOS-X
   1. Node 6+ (our package manager)
   1. JRE6+ (Java is used to run the local data service)
   1. VS Code (instructions here assume this IDE)
1. Given your name for `<project-dir>,` navigate to the parent directory and clone:
    ```
    cd <parent-dir>
    git clone git@github.com:trobbie/commhelper.git <project-dir>
    ```
1. Setup node modules for root directory:
    ```
    cd <project-dir>
    npm install
    ```
1. Setup node modules for individual services (note: COMMHELPER_ENV is used in scripts to designate our environment)
    ```
    COMMHELPER_ENV=dev
    npm run postinstall
    ```
1. Run database service.  Then create database tables and test data.
    ```
    npm run start:dev_db &
    npm run resetDatabase:dev
    ```
1. For quick load of all services, now or in the future, run:
    ```
    npm run start:dev
    ```

The services are accessible as follows:

| Service | Address
|---------|---------|
| Front-end | http://localhost:4200
| REST API | http://localhost:3000
| Database | http://localhost:4002


## Development Workflow Dependencies

The front-end depends on the REST API, which depends on the database layer.  To develop one layer, make sure all its dependencies are running.  
Run individual commands in individual terminal windows to watch independent log output.

| Developing this layer | Command(s) used to run dependencies |
|-----------------------|-------------------------------------|
| Database | `<no dependencies>`
| REST API | npm run start:dev_db
| Front-end | npm run start:dev_db
|           | npm run start:dev_api

## Front-end Development

### Starting frontend web service

1. Ensure dependent services are running (see above).

1. Create separate terminal window (or use VS Code IDE) to track stdout/errors during navigation.

1. Run `npm run start:dev_web`.

1. To interact, navigate to `http://localhost:4200/`.

Note: The app will automatically reload if you change any of the source files.

### Running unit tests
(Note: dependent services are not needed) 

1. Create separate terminal window (or use VS Code IDE).  Root directory should be <project-dir>.

1. Run `npm run test:dev_web` to execute the unit tests via [Karma](https://karma-runner.github.io).

1. A browser window will display with the test results.  To cancel, Ctrl-C the terminal command.

Note: if not cancelled, the test will reload when changing source files.  If the original browser tab is still up (not disconnected), it will also automatically reload the browser's page.

Unit tests are also automatically run in CircleCI after remote GIT pushes, using a headless Chrome browser.

### Running end-to-end (integration) tests

1. Ensure dependent services are running (see above).  These tests are testing integration.

1. Create separate terminal window (or use VS Code IDE) to track stdout/errors during testing.

1. Change working directory to <project-dir>/frontend/web.

1. Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

This is also automatically run in CircleCI after remote GIT pushes. (***IN THE WORKS***)

### Building project

1. Change working directory to <project-dir>/frontend/web.

1. Run `ng build` to build the project. 

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Authors

* **Trevor Robbie** - *Initial work* - [Github account](https://github.com/trobbie)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
