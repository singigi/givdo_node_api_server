'use strict';
var FacebookTokenStrategy = require('passport-facebook-token');
var utils = require('../utils');

/*var passport = require('passport');
var model = require('../models/index');
var users = require('../models/users');


var jwt_config = require('./jwt_config');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
/*
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"),

opts.secretOrKey = 'S4Dfk^h80fyg9%KreuHkrTF0CY^Hb%Kr';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log('Using jwt strategy');
  console.log(jwt_payload);
  /*users.findOne({id: jwt_payload.sub}, function(err, user) {
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
}));*/

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = 'secret';

console.log('\x1b[31m','Control comes here');       //print in red
console.log('\x1b[0m'), '';     //reset console text color to default

//Problem: It is getting the jwt and partially decoding it, however, it fails with "Invalid signature" error. Signing issue maybe? Yes! Fixed it!
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('Control never comes here');
    console.log('\x1b[36m%s\x1b[0m', 'Control never comes here Control never comes here Control never comes here Control never comes here');  //cyan

    users.findOne({id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
    /*users.findOne({ _id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });*/
}));


  passport.use(new FacebookTokenStrategy({
      clientID: '777523425775694',
      clientSecret: 'aef628c4f6b7d7349beaa77c09258f98'
    },
    function (access_token, refreshToken, profile, done) {
      utils.checkFacebookUser(access_token, refreshToken, profile, function(err, user) {
        return done(err, user);   //Now user is the facebook profile
      });
    }));

