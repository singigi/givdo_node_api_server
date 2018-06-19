var express = require('express');
var router = express.Router();
var utils = require('../utils');
var passport = require('passport');

//E1: Facebook Server side auth route
router.post('/facebook/callback', passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }

    //prepare token for API
    req.auth = {
        id: req.user.id
    };

    next();
}, utils.generateToken, utils.sendToken);

//E2: Get currently logged in user
router.get('/get_user', utils.authenticate, utils.getCurrentUser, utils.getOne);

module.exports = router;
