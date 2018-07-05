/*
    This is where we configure the Passport strategies. We have two strategies: one for direct Facebook login, and one
    which decodes and verifies JSON web tokens (JWTs) in order to log in a previously authorized user whose token is not yet expired.

    With the first strategy, our client app obtains authorization from the user for our app (our app is registered on Facebook) to access their 
    Facebook profile, and Facebook sends an access token to the client app. The access token uniquely identifies the user. The client then sends 
    this access token to us (the server), and we pass it to the FacebookTokenStrategy below, along with our Facebook app id (which the user 
    has authorized via the client app). 
    
    That strategy will send the access token to Facebook for them to verify that we are the intended recipient of the user's information, 
    and they will return the user's Facebook data to us. We will then pass that data to our utils.checkFacebookUser method and see if the user
    already exists in our database. If they do, we return their existing Givdo profile.

    If the user does not exist yet, we create a record for them in our database and return the new profile, along with a JSON web token, which the client 
    needs to store in the browser's local storage for authentication in protected routes.

    The second strategy simply takes a JWT sent by the client, decodes it, and checks to see if it is valid and unexpired. Our valid JWTs have the user 
    profile information encoded within them. If it is valid, we look up the user in our database and return their Givdo profile data. If not, the
    call will fail, and the client will redirect the user to the login page. There, the user will be able to to log in with the Facebook login route.

*/

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


//JWT login
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
      console.log('\x1b[36m%s\x1b[0m', 'Got response from Facebook, will try to check database for user now.');  //Print in cyan  
      utils.checkFacebookUser(access_token, refreshToken, profile, function(err, user) {
        return done(err, user);   
      });
    }));

