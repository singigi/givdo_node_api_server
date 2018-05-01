var express = require('express');
var bodyParser = require('body-parser');
var logger = require ('morgan');
//var cors = require('cors');
var path = require('path');
var validator = require('express-validator');

var users = require('./routes/users');
var badges = require('./routes/badges');
var causes = require('./routes/causes');
var admin_users = require('./routes/admin_users');

var app = express();

app.use(bodyParser.json());
//app.use(cors());
app.use(validator());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/badges', badges);
app.use('/causes', causes);
app.use('/admin_users', admin_users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
});
return;
});


module.exports = app;

