/* 
    This file contains some global methods to help with oauth 
*/



var methods = {};

methods.checkFacebookUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    console.log("checkFacebookUser called - need to implement this method in utils.js");
    //Check to see if the users exist in our database and add if not. Return to the callback function.
};

module.exports = methods;