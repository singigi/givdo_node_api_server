'use strict';
var FacebookTokenStrategy = require('passport-facebook-token');
var utils = require('../utils');
var model = require('../models/index');
var users = model.users;

/*


var jwt_config = require('./jwt_config');
/*

opts.secretOrKey = 'S4Dfk^h80fyg9%KreuHkrTF0CY^Hb%Kr'; */

var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = 'secret';


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


  passport.use(new FacebookTokenStrategy({
      clientID: '777523425775694',
      clientSecret: 'aef628c4f6b7d7349beaa77c09258f98'
    },
    function (access_token, refreshToken, profile, done) {
      utils.checkFacebookUser(access_token, refreshToken, profile, function(err, user) {
        return done(err, user);   //Now user is the facebook profile
      });
    }));

