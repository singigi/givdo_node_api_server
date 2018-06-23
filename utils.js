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
                return cb(false, new_profile)           //returning our modified profile without sensitive data
            })
            .catch(function(error){
                return cb(error, []);
            });
        }
        else {
            var new_profile = setProfileContent(user);
            console.log('Modified profile: ' + JSON.stringify(new_profile));
            //cb(false, profile);     //we are returning the FACEBOOK profile here, not our own 
            cb(false, new_profile);     //Return OUR profile via callback
        }
    })
    .catch(function(error){
        cb(error, []);
    });
};

//Middleware for authenticating every incoming API request. Checks to see if JWT is valid, and if so, sets req.auth with the decoded JSON object (I think this just has the fb id in it).
methods.authenticate = expressJwt({
    secret: 'my-secret',        //change this
    requestProperty: 'auth',
    getToken: function(req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

methods.createToken = function(auth) {
    //These are the attributes that will be encoded in the jwt
    return jwt.sign({
            id: auth.id,
            first_name: auth.first_name,
            last_name: auth.last_name,
            email: auth.email,
            image_link: auth.image_link
        }, 'secret',         //change this
        {
            expiresIn: 60 * 120
        });
};

methods.generateToken = function (req, res, next) {
    //req.token = methods.createToken(req.auth);      //req.auth has one attribute, which is id. It is the facebook id. We probably need to switch it for our id.
    req.token = methods.createToken(req.user);          
    next();
};

/*
methods.sendToken3 = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
};*/

methods.sendToken = function (req, res) {
    res.status(200).json({
        token: 'JWT ' + req.token,
        user: req.user
    });
};


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

methods.getOne = function (req, res) {
    var user = req.user;
    delete user['facebookProvider'];        //We don't need this, or the next line, as we do not have these db fields.
    delete user['__v'];
    res.json(user);         //So this sends back the entire user in JSON format. We really only need to send the user id. But would it be better to send everything?
};

/*
methods.checkFacebookUser = function(accessToken, refreshToken, profile, cb) {
    //Check to see if the users exist in our database and add if not. Return to the callback function.
    users.findAll({
        where: {'facebook_id': profile.id}
    })
    console.log("checkFacebookUser called - need to implement this method in utils.js");
    console.log("View SELECT statement two lines above this to see your facebook user id");

};
*/

module.exports = methods;

