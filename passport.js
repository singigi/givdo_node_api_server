'use strict';

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var model = require('./models/index');
var users = require('./models/users');
var utils = require('./utils');

module.exports = function () {

  passport.use(new FacebookTokenStrategy({
      clientID: '777523425775694',
      clientSecret: 'aef628c4f6b7d7349beaa77c09258f98'
    },
    function (accessToken, refreshToken, profile, done) {
      utils.checkFacebookUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
    }));

};