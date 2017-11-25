const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const Raven = require('./raven/');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  exposedHeaders: ['x-total-count']
};

app.use(cors(corsOptions));
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(Raven.requestHandler());

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Add response
app.use(require('./lib/response'));
app.use('/api', require('./routes/api'));
app.use('/users', require('./routes/user-route/'));
app.use('/upload', require('./routes/upload'));
app.use('/contract', require('./routes/contract'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(Raven.errorHandler());
// Optional fallthrough error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (err.status) {
    res.status(err.status);
    res.render('error');
  } else {
    console.log(res.locals);
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.response(500, `Error id #${res.sentry}. Please contact admin for more information!`);
  }
});

module.exports = app;
