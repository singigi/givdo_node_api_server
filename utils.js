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
    console.log("checkFacebookUser called - need to implement this method in utils.js");
    console.log("View SELECT statement two lines above this to see your facebook user id");

}; 

module.exports = methods;

