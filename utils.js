var jwt = require('jsonwebtoken');
var passport = require('passport');
var expressJwt = require('express-jwt');
var model = require('./models/index');
var users = model.users;

/* 
    This file contains some global methods to help with oauth 
*/

var methods = {};

methods.checkFacebookUser = function(accessToken, refreshToken, profile, cb) {
    //Check to see if the users exist in our database and add if not. Return to the callback function.
    profile.access_token = accessToken;

    users.findAll({
        where: {'facebook_id': profile.id}
    })
    .then(function(users_res) {
        if (users_res.length == 0) {
            users.create({
                facebook_id: profile.id,
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                access_token: accessToken,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(function(user){
                return cb(false, profile)
            })
            .catch(function(error){
                return cb(error, []);
            });
        }
        else {
            cb(false, profile);
        }
    })
    .catch(function(error){
        cb(error, []);
    });
};

//token handling middleware
methods.authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function(req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

methods.createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

methods.generateToken = function (req, res, next) {
    req.token = methods.createToken(req.auth);
    next();
};

methods.sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
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
    delete user['facebookProvider'];
    delete user['__v'];
    res.json(user);
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

