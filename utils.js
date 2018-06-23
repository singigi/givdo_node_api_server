var jwt = require('jsonwebtoken');
var passport = require('passport');
var expressJwt = require('express-jwt');
var model = require('./models/index');
var users = model.users;
var jwt_config = require('./config/jwt_config.js')

/* 
    This file contains some global methods to help with oauth 
*/

var methods = {};

//Data we want to go back to the client in the JWT is set here (we don't want to send things like passwords or sensitive information).
function setProfileContent(request){
    return {
        id: request[0].id,
        first_name: request[0].first_name,
        last_name: request[0].last_name,
        email: request[0].email,
        image_link: request[0].image_link
    };
}

methods.checkFacebookUser = function(accessToken, refreshToken, profile, cb) {
    //Check to see if the users exist in our database and add if not. Return to the callback function.
    profile.access_token = accessToken;

    users.findAll({
        where: {'facebook_id': profile.id},
        raw: true       //raw json
    })
    .then(function(user) {
        if (user.length == 0) {
            users.create({
                facebook_id: profile.id,
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                access_token: accessToken,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(function(user){
                var new_profile = setProfileContent(user);
                return cb(false, new_profile)           //Return our modified profile without sensitive data
            })
            .catch(function(error){
                return cb(error, []);
            });
        }
        else {
            var new_profile = setProfileContent(user);
            console.log('Modified profile: ' + JSON.stringify(new_profile));
            cb(false, new_profile);                     //Return our modified profile via callback
        }
    })
    .catch(function(error){
        cb(error, []);
    });
};


methods.createToken = function(auth) {
    //These are the attributes that will be encoded in the jwt
    return jwt.sign({
            id: auth.id,
            first_name: auth.first_name,
            last_name: auth.last_name,
            email: auth.email,
            image_link: auth.image_link
        }, jwt_config.secret,         //Change this for production
        {
            expiresIn: 60 * 120
        });
};

methods.generateToken = function (req, res, next) {
    //req.token = methods.createToken(req.auth);      //req.auth has one attribute, which is id. 
    req.token = methods.createToken(req.user);          
    next();
};

/*
methods.sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
};*/

methods.sendToken = function (req, res) {
    res.status(200).json({
        token: 'JWT ' + req.token,
        user: req.user
    });
};

//We are not currently using these next two methods to retreive the current user, however, we will leave them in case they are needed in the future.
methods.getCurrentUser = function(req, res, next) {
    users.findAll({
        where: {facebook_id: req.auth.id},
        raw: true
    })
        .then(function(model_users){
            req.user = model_users;
            next();
        })
        .catch(function(model_users){
            req.user = model_users;
            next();
        });
};

//Called after getCurrentUser (above) to send back the user profile
methods.getOne = function (req, res) {
    var user = req.user;
    res.json(user);         //Sends back the user profile in JSON format. 
};

module.exports = methods;

