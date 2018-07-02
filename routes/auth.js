var express = require('express');
var router = express.Router();
var utils = require('../utils');
var passport = require('passport');
var passportService = require('../config/passport');

var facebookLogin = passport.authenticate('facebook-token', {session: false});
var requireAuth = passport.authenticate('jwt', {session: false});         //Use this for protected routes

//E1: Facebook Server side auth route
router.post('/facebook/callback', facebookLogin, function(req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }

    //prepare token for API
    req.auth = {
        id: req.user.id     //our database user id
    };

    next();
}, utils.generateToken, utils.sendToken);


router.get('/checklogin', requireAuth, function(req, res){
    console.log('protected route');
    res.json(req.user);
});

//Get currently logged in user. We are not using this right now, since we switched from expressJwt to passport-jwt and are doing this in the /checklogin route.
//router.get('/get_user', utils.authenticate, utils.getCurrentUser, utils.getOne);

module.exports = router;
