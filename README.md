# Commhelper

Community helper is intended to aid community coordinators in organizing their helper participation.  Further details are explained in the Project's Wiki.

It is currently under construction in early stages of development.

## Components (Current and Planned)
| Name         | Technologies |   Dev Env   | Staging Env
|--------------|--------------|-------------|-------------|
| Frontend Web | Node, Angular 7 | Localhost | AWS S3?
| WEB API      | REST, AWS DynamoDB SDK | Localhost | AWS Lambda?
| DB           | NoSQL, AWS DynamoDB Local | Localhost | AWS DynamoDB?

CI/CD: CircleCI (webhook on GIT commits)

Requirements:
    a) Node 6+ (our package manager)
		b) JRE6+ (Java is used to run the local data service)
		c) VS Code (as IDE)

## Development Environment Setup
1) Given your name for <project-dir>, navigate to the parent directory and clone:
```
	cd <parent-dir>
	git clone git@bitbucket.org:trobbie/commhelper.git <project-dir>
```

2) Setup node modules for root directory:
```
	cd <project-dir>
	npm install
```

3) Setup node modules for individual services (note: NODE_ENV is used in scripts to designate our environment)
```
	NODE_ENV=dev
	npm run postinstall
```

4) Run database service.  Then create database tables and test data.
```
		npm run start:dev_db &
		npm run resetDatabase:dev
```

5) For quick load of all services, now or in the future, run:
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
| Database | <no dependencies>
| REST API | npm run start:dev_db
| Front-end | npm run start:dev_db
|           | npm run start:dev_api

## Front-end Development

### Starting service
Ensure dependent services are running.  Then change working directory to frontend/web.  Run `ng serve` for a dev web server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Running unit tests
Ensure dependent services are running.  Then change working directory to frontend/web.  Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

This is also automatically run in CircleCI after remote GIT pushes.

### Running end-to-end tests
Ensure dependent services are running.  Then change working directory to frontend/web.  Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

This is also automatically run in CircleCI after remote GIT pushes.

### Building project
Change working directory to frontend/web.  Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Authors

* **Trevor Robbie** - *Initial work* - [Bitbucket account](https://bitbucket.org/trobbie)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
