var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var organizations = model.organizations;

//E1: GET all organizations
router.get('/', function (req, res, next) {
    organizations.findAll({
            attributes: ['id', 'name', 'facebook_id', 'picture', 'state', 
                'city', 'zip', 'street', 'mission', 'created_at', 'updated_at'],
            where: {'active': 1}
        })
        .then(organizations => res.json({
        error: false,
        data: organizations
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E2: GET organization by id
router.get('/:id', function (req, res, next) {
    organizations.findAll({
            attributes: ['id', 'name', 'facebook_id', 'picture', 'state', 
                'city', 'zip', 'street', 'mission', 'created_at', 'updated_at'],
            where:{
                id: req.params.id,
                'active': 1
            }})
        .then(organizations => res.json({
        error: false,
        data: organizations
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});



//?3: Add organization
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z0-9 ]+$/i).withMessage('Only alphanumeric characters and spaces are allowed');

    req.checkBody('state').trim().escape().isLength({ min: 2, max: 255 }).withMessage('State should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabet characters are allowed');

    req.checkBody('city').trim().escape().isLength({ min: 2, max: 255 }).withMessage('City should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabet characters are allowed');

    req.checkBody('zip').trim().escape().notEmpty().withMessage('Zip is required');

    req.checkBody('street').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Street should be at least ' +
        '3 chars and at most 255 chars');

    req.checkBody('mission').trim().escape().isLength({ min: 10, max: 2000 }).withMessage('Mission should be at least ' +
        '10 chars and at most 2000 chars');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        organizations.create({
                name: req.body.name,    
                facebook_id: req.body.facebook_id,
                picture: req.body.picture,
                mission: req.body.mission,
                state: req.body.state,
                city: req.body.city,
                zip: req.body.zip,
                street: req.body.street,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(organization => res.status(201).json({
            error: false,
            data: organization,
            message: 'New organization created.'
        }))
    .catch(error => res.json({
            error: true,
            data: [],
            message: error
        }));
    }
});

//?4: Update organization
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z0-9 ]+$/i).withMessage('Only alphanumeric characters and spaces are allowed'); 
    
    req.checkBody('state').trim().escape().isLength({ min: 2, max: 255 }).withMessage('State should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\-\s]+$/i).withMessage('Only alphabets and hypens are allowed');

    req.checkBody('city').trim().escape().isLength({ min: 2, max: 255 }).withMessage('City should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\-\s]+$/i).withMessage('Only alphabets and hypens are allowed');

    req.checkBody('zip').trim().escape().notEmpty().withMessage('Zip is required');

    req.checkBody('street').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Street should be at least ' +
        '3 chars and at most 255 chars');

    req.checkBody('mission').trim().escape().isLength({ min: 10, max: 2000 }).withMessage('Mission should be at least ' +
        '10 chars and at most 2000 chars');

    var errors = req.validationErrors();
        if(errors){
            res.json(errors);
        }
        else {
            organizations.update({
                name: req.body.name,    
                facebook_id: req.body.facebook_id,
                picture: req.body.picture,
                mission: req.body.mission,
                state: req.body.state,
                city: req.body.city,
                zip: req.body.zip,
                street: req.body.street,                
                updated_at: new Date()
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(organization => res.status(201).json({
                error: false,
                message: 'Organization data updated.'
            }))
        .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);

//?5: Inactivate organization by id
router.delete('/:id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        organizations.update({
            active: 0,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(organization => res.status(201).json({
            error: false,
            message: 'Organization inactivated (to permanently delete all record, use database tools).'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});



module.exports = router;
