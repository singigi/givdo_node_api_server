'use strict';
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt_config = require('./jwt_config');

var utils = require('../utils');
var model = require('../models/index');
var users = model.users;


//Configure Jwt Strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = jwt_config.secret;           //We need to change this for production (storing our key in the repo is not secure).


passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('\x1b[36m%s\x1b[0m', 'Jwt decoded, looking for user in our database');  //Print in cyan
    console.log('\x1b[0m'), '';     //Reset console text color to default
    
    users.findOne({
        where: {id: jwt_payload.id},
        attributes: ['id', 'first_name', 'last_name', 'email', 'image_link', 'facebook_id', 'has_create_privileges', 'created_at', 'updated_at']
    }).then(function(user) {
        console.log('\x1b[31m','Searched database for user with no errors');        //Print in red
        console.log('\x1b[0m'), '';                                                 //Reset console text color to default
        
        if (!user) {
            return done(null, false, {
                message: 'User does not exist'
            });
        }

        return done(null, user);

    }).catch(function(err) {

        console.log("Error:", err);

        return done(null, false, {
            message: 'Problem with JWT login (check passport.js JwtStrategy code).'
        });

    });

    
}));

  //Direct Facebook login  
  passport.use(new FacebookTokenStrategy({
      clientID: '777523425775694',
      clientSecret: 'aef628c4f6b7d7349beaa77c09258f98'
    },
    function (access_token, refreshToken, profile, done) {
      utils.checkFacebookUser(access_token, refreshToken, profile, function(err, user) {
        return done(err, user);   
      });
    }));

