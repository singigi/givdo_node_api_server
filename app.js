var express = require('express');
var bodyParser = require('body-parser');
var logger = require ('morgan');
var cors = require('cors');
var path = require('path');
var validator = require('express-validator');

var users = require('./routes/users');
var badges = require('./routes/badges');
var causes = require('./routes/causes');
var admin_users = require('./routes/admin_users');
var organizations = require('./routes/organizations');
var questions = require('./routes/questions');
var question_options = require('./routes/question_options');
var advertisements = require('./routes/advertisements');
var user_badges = require('./routes/user_badges');
var user_causes = require('./routes/user_causes');
var donation_items = require('./routes/donation_items');
var games = require('./routes/games');
var donations = require('./routes/donations');
var user_game_attempts = require('./routes/user_game_attempts');
var game_questions = require('./routes/game_questions');
var question_categories = require('./routes/question_categories');
var player_response = require('./routes/player_response');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var expressJwt = require('express-jwt');


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
app.use('/organizations', organizations);
app.use('/questions', questions);
app.use('/question_options', question_options);
app.use('/advertisements', advertisements);
app.use('/user_badges', user_badges);
app.use('/user_causes', user_causes);
app.use('/donation_items', donation_items);
app.use('/games', games);
app.use('/donations', donations);
app.use('/user_game_attempts', user_game_attempts);
app.use('/game_questions', game_questions);
app.use('/question_categories', question_categories);
app.use('/player_response', player_response);

//Begin Facebook authentication section
var model = require('./models/index');
var passportConfig = require('./passport');

var router = express.Router()
var user = model.users;
app.use('/api/v1', router);

/*/Configure cors to expose proper headers for authentication
var corsOption = {
  origin: 'http://localhost:8100',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption)); */

app.use(cors({
  origin: 'http://localhost:8100',
  exposedHeaders: ['x-auth-token']
}));

//setup configuration for facebook login
passportConfig();

var createToken = function(auth) {
  console.log("createToken");

  return jwt.sign({
    id: auth.id
  }, 'my-secret',
  {
    expiresIn: 60 * 120
  });
};

var generateToken = function (req, res, next) {
  req.token = createToken(req.auth);
  console.log("generateToken");
  next();
};

var sendToken = function (req, res) {
  console.log("sendToken");

  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
};

router.route('/oauth/facebook/callback')
  .post(passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    //prepare token for API
    req.auth = {
      id: req.user.id
    };

    console.log("Something");

    next();
  }, generateToken, sendToken);

//token handling middleware
var authenticate = expressJwt({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: function(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});

var getCurrentUser = function(req, res, next) {
  User.findById(req.auth.id, function(err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

var getOne = function (req, res) {
  var user = req.user.toObject();

  delete user['facebookProvider'];
  delete user['__v'];

  res.json(user);
};
//end Facebook authentication section


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

router.route('/auth/me')
  .get(authenticate, getCurrentUser, getOne);

module.exports = app;