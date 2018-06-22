'use strict';

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var model = require('../models/index');
var users = require('../models/users');
var utils = require('../utils');

var passport = require('passport');
var jwt_config = require('./jwt_config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


module.exports = function () {
  passport.use(new FacebookTokenStrategy({
      clientID: '777523425775694',
      clientSecret: 'aef628c4f6b7d7349beaa77c09258f98'
    },
    function (access_token, refreshToken, profile, done) {
      utils.checkFacebookUser(access_token, refreshToken, profile, function(err, user) {
        return done(err, user);   //Now user is the facebook profile
      });
    }));

};

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: jwt_config.secret
};


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  users.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  });
}));

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


//This isn't working!
module.exports = function () {
  passport.use(new JwtStrategy(jwtOptions, function(payload, done){

    users.findAll({
      where: {'id': payload.id}
    })
    .then(function(user){
      if(user.length == 0) {
        done(null, false);
      }
      else{
        done(null, user);
      }
  
    })
    .catch(function(error){
      return done(error, false);
    })
  
  }));

};

var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){

  users.findAll({
    where: {'id': payload.id}
  })
  .then(function(user){
    if(user.length == 0) {
      done(null, false);
    }
    else{
      done(null, user);
    }

  })
  .catch(function(error){
    return done(error, false);
  })

});


users.findOne({where: {id: jwt_payload.id}})
    if (err) {
        return done(err, false);
    }
    if (user) {
        return done(null, jwt_payload);
    } else {
        return done(null, false);
    }



passport.use(jwtLogin);