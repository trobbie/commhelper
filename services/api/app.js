const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cors = require("cors");
const favicon = require('serve-favicon');

const index = require('./routes/index');
const users = require('./routes/users');
const activities = require('./routes/activities');
const docClient = require('./db-service.js').docClient;

const app = express();

console.log('NODE-ENV:' + process.env.NODE_ENV);
let service_port;
if (process.env.NODE_ENV == 'unit-test') {
  service_port = 3001;
} else {
  service_port = 3000;
}

app.listen(service_port, (e) => console.log('Commhelper API listening on port ' + service_port + '!'));

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());  // allow CORS

// pug views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// serve static files from the `public` folder
app.use(express.static(path.join(__dirname, 'public')));

const root_url_v1 = '/api/v1';
app.use(root_url_v1, index);
app.use(root_url_v1 + '/users', users);
app.use(root_url_v1 + '/activities', activities);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  let errStatus = err.status || 500;
  console.error("ERROR (code " + errStatus + "): " + res.locals.message);

  // render the error page
  res.status(errStatus);
  res.render('error');
});

module.exports = app;
