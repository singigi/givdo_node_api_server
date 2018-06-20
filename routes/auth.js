var express = require('express');
var router = express.Router();
var utils = require('../utils');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});       //Use this for protected routes

//E1: Facebook Server side auth route
router.post('/facebook/callback', passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }

    //prepare token for API
    req.auth = {
        id: req.user.id     //Facebook id? Check this. Yes, facebook id 10213555086684976. We need to also put our own id in here.
    };

    next();
}, utils.generateToken, utils.sendToken3);

//E2: Get currently logged in user
router.get('/get_user', utils.authenticate, utils.getCurrentUser, utils.getOne);

router.get('/protected', requireAuth, function(req, res){
    res.send({ content: 'Success'});
});

module.exports = router;
