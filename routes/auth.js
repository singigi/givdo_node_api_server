var express = require('express');
var router = express.Router();
var utils = require('../utils');
var passport = require('passport');
var passportService = require('../config/passport');

//var requireAuth = passport.authenticate('jwt', {session: false});       //Use this for protected routes
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

//E2: Get currently logged in user
router.get('/get_user', utils.authenticate, utils.getCurrentUser, utils.getOne);

/*
router.get('/protected', passport.authenticate('jwt', {session: false}), function(req, res){
    console.log('protected');
    //res.send({ content: 'Success'});
    res.json(req.user);
}); */

router.get('/checklogin', requireAuth, function(req, res){
    console.log('protected route');
    res.json(req.user);
});

module.exports = router;
