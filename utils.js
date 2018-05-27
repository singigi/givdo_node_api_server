var express = require('express');
var router = express.Router();
var model = require('./models/index');
var check = require('express-validator/check');
var users = model.users;

/* 
    This file contains some global methods to help with oauth 
*/

var methods = {};

methods.checkFacebookUser = function(accessToken, refreshToken, profile, cb) {
    //Check to see if the users exist in our database and add if not. Return to the callback function.
    users.findAll({
        where: {'facebook_id': profile.id}
    })
    .then(function(users_res) {
        if (users_res.length == 0) {
            users.create({
                facebook_id: profile.id,
                first_name: profile.first_name,
                last_name: profile.last_name,
                image_link: req.body.picture,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(function(user){
                return cb(false, user)
            })
            .catch(function(error){
                return cb(error, []);
            });
        }
        else {
            cb(false, users_res);
        }
    })
    .catch(function(error){
        cb(error, []);
    });

    console.log("checkFacebookUser called - need to implement this method in utils.js");
    console.log("View SELECT statement two lines above this to see your facebook user id");

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

