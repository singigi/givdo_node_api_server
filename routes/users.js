var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var users = model.users;



//E1: GET all active users; returns NULL if no active users exist
router.get('/', function (req, res, next) {
    users.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email', 'image_link', 'facebook_id', 'has_create_privileges', 'created_at', 'updated_at'],
        where: {'active': 1}
    })
    .then(users => res.json({
        error: false,
        data: users
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E2: GET user by id; returns NULL if no active user with specified id exists
router.get('/:id', function (req, res, next) {
    users.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email', 'image_link', 'facebook_id', 'has_create_privileges', 'created_at', 'updated_at'],
        where:{
            id: req.params.id,
            'active': 1
        }})
        .then(users => res.json({
        error: false,
        data: users
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});


//E3: Add user
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    //Currently we are not doing validations on email for users because due to Facebook login procedures we may not have emails for everyone.

    req.checkBody('first_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('First name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic characters are allowed');
        
    req.checkBody('last_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Last name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic character are allowed');  

    if(req.checkBody('email').exists){
        req.checkBody('email').trim().escape().isEmail().withMessage('Invalid email');
    }
              
   

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        users.create({
             first_name: req.body.first_name,
             last_name: req.body.last_name,
             email: req.body.email,
             image_link: req.body.image_link,
             facebook_id: req.body.facebook_id,
             created_at: new Date(),
             updated_at: new Date()
         })
         .then(users => res.status(201).json({
             error: false,
             data: users,
             message: 'New user created.'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
    }
});

//E4: Update user
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('first_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('First name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic characters are allowed');
        
    req.checkBody('last_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Last name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic character are allowed');  
        
    if(req.checkBody('email').exists){
            req.checkBody('email').trim().escape().isEmail().withMessage('Invalid email');
    }      
    
    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        users.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            image_link: req.body.image_link,
            facebook_id: req.body.facebook_id,
            has_create_privileges: req.body.has_create_privileges,
            updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(users => res.status(201).json({
                error: false,
                message: 'User data updated.'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);

//E5: Inactivate user by id
router.delete('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        users.update({
            active: 0,
            updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(users => res.status(201).json({
                error: false,
                message: 'User inactivated (to permanently delete all record, use database tools).'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);


/* 
    Some utility methods to help with oauth:
 

var methods = {};

methods.checkFacebookUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    console.log("checkFacebookUser called - need to implement this method in utils.js");
    //Check to see if the users exist in our database and add if not. Return to the callback function.
};


module.exports = {
    checkFacebookUser: function(accessToken, refreshToken, profile, cb) {
        var that = this;
        console.log("checkFacebookUser called - need to implement this method in utils.js");
    },
};*/
  

//module.exports = methods;
module.exports = router;
