'use strict';

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
//var User = require('mongoose').model('User');
var model = require('./models/index');
var user = model.users;

module.exports = function () {

  passport.use(new FacebookTokenStrategy({
      clientID: '777523425775694',
      clientSecret: 'aef628c4f6b7d7349beaa77c09258f98'
    },
    function (accessToken, refreshToken, profile, done) {
      user.checkFacebookUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
    }));

};