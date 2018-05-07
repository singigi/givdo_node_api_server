var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var admins = model.admin_users;

//E1: GET all admin users; returns NULL if no active admin users exist
router.get('/', function (req, res, next) {
    admins.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email'],
        where: {'active': 1}
    })
    .then(admins => res.json({
        error: false,
        data: admins
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E2: GET admin user by id; returns NULL if no active admin with specified id exists
router.get('/:id', function (req, res, next) {
    admins.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email'],
        where:{
            id: req.params.id,
            'active': 1
        }})
        .then(admins => res.json({
        error: false,
        data: admins
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E3: Add admin user
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('first_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('First name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic characters are allowed');
        
    req.checkBody('last_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Last name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic character are allowed');  
          
    req.checkBody('encrypted_password').trim().escape().isLength({ min: 7, max: 15 }).withMessage('Password should be at least ' +
        '7 chars and at most 15 chars');    

    req.checkBody('email').isEmail().withMessage('Must provide a valid email');
    

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        admins.create({
             first_name: req.body.first_name,
             last_name: req.body.last_name,
             email: req.body.email,
             encrypted_password: req.body.encrypted_password,
             created_at: new Date(),
             updated_at: new Date()
         })
         .then(admins => res.status(201).json({
             error: false,
             data: admins,
             message: 'New admin user created.'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
    }
});

//E4: Update admin user
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
    '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('first_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('First name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic characters are allowed');
        
    req.checkBody('last_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Last name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic character are allowed');  
          
    req.checkBody('encrypted_password').trim().escape().isLength({ min: 7, max: 15 }).withMessage('Password should be at least ' +
        '7 chars and at most 15 chars');    

    req.checkBody('email').isEmail().withMessage('Must provide a valid email');
    
    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        admins.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            encrypted_password: req.body.encrypted_password,
            updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(admins => res.status(201).json({
                error: false,
                message: 'Admin user data updated.'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);

//E5: Inactivate admin user by id
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
        admins.update({
            active: 0,
            updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(admins => res.status(201).json({
                error: false,
                message: 'Admin user inactivated (to permanently delete all record, use database tools).'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);



module.exports = router;
