# Commhelper

| Name             | Tech | Staging Env
|--------------|---------|-----------|
| Frontend Web | Angular | AWS S3?
| REST API     | ? | AWS Lambda?
| DB           | Mongodb | AWS DynamoDB?


The frontend web component  was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.

## Development environment

The data service is currently be provided by a temporary json-server setup.  As such, once you get the initial mock data used by json-server, you want git to ignore file updates to the mock data (which updates every time the data changes).

Thus, after cloning the repository:
* git update-index --assume-unchanged frontend/web/src/testing/mocks/dev-data.json
* git update-index --assume-unchanged frontend/web/src/testing/mocks/e2e-data.json

## Development web component server

Change working directory to frontend/web.  Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Change working directory to frontend/web.  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Change working directory to frontend/web.  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

This is also automatically run in CircleCI after remote GIT pushes.

## Running end-to-end tests

Change working directory to frontend/web.  Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

This is also automatically run in CircleCI after remote GIT pushes.

