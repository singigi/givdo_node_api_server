var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var organizations = model.organizations;

//E1: GET all organizations
router.get('/', function (req, res, next) {
    organizations.findAll({
            attributes: ['id', 'facebook_id', 'name', 'picture', 'state',
                         'city', 'zip', 'street', 'mission'],
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
    organizations.findOne({
            attributes: ['id', 'facebook_id', 'name', 'picture', 'state',
                'city', 'zip', 'street', 'mission'],
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

//E3: Delete organization by id
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
        organizations.destroy({where: {
                id: req.params.id
            }})
            .then(status => res.status(201).json({
            error: false,
            message: 'Organization has been deleted.'
        }))
    .catch(error => res.json({
            error: true,
            error: error
        }))
    }
});


//E4: Add organization
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // facebook_id validation
    req.checkBody('facebook_id').trim().escape().notEmpty().withMessage('Facebook URL is required').
    matches('https://www.facebook.com/*').withMessage('Enter a valid Facebook URL');

    // name validation
    req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabets are allowed');

    // picture validation
    req.checkBody('picture').trim().escape().notEmpty().withMessage('Picture URL is required').
    matches('https://*').withMessage('Enter a valid pciture URL');

    // state validation
    req.checkBody('state').trim().escape().isLength({ min: 3, max: 255 }).withMessage('State should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\-\s]+$/i).withMessage('Only alphabets and hypens are allowed');

    // city validation
    req.checkBody('city').trim().escape().isLength({ min: 3, max: 255 }).withMessage('City should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\-\s]+$/i).withMessage('Only alphabets and hypens are allowed');

    // zip validation
    req.checkBody('zip').trim().escape().notEmpty().withMessage('Zip is required').
        isPostalCode().withMessage('Enter a valid Zip');

    // street validation
    req.checkBody('street').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Street should be at least ' +
        '3 chars and at most 255 chars');

    // mission validation
    req.checkBody('mission').trim().escape().isLength({ min: 10, max: 2000 }).withMessage('Street should be at least ' +
        '10 chars and at most 2000 chars');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        organizations.create({
                facebook_id: req.body.facebook_id,
                name: req.body.name,
                picture: req.body.picture,
                state: req.body.state,
                city: req.body.city,
                zip: req.body.zip,
                street: req.body.street,
                mission: req.body.mission,
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
            error: error
        }));
    }
});

//E5: Update organization
router.post('/:id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');


    // facebook_id validation
    req.checkBody('facebook_id').trim().escape().notEmpty().withMessage('Facebook URL is required').
    matches('https://www.facebook.com/*').withMessage('Enter a valid Facebook URL');

    // name validation
    req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabets are allowed');

    // picture validation
    req.checkBody('picture').trim().escape().notEmpty().withMessage('Picture URL is required').
    matches('https://*').withMessage('Enter a valid pciture URL');

    // state validation
    req.checkBody('state').trim().escape().isLength({ min: 3, max: 255 }).withMessage('State should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\-\s]+$/i).withMessage('Only alphabets and hypens are allowed');

    // city validation
    req.checkBody('city').trim().escape().isLength({ min: 3, max: 255 }).withMessage('City should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\-\s]+$/i).withMessage('Only alphabets and hypens are allowed');

    // zip validation
    req.checkBody('zip').trim().escape().notEmpty().withMessage('Zip is required').
    isPostalCode().withMessage('Enter a valid Zip');

    // street validation
    req.checkBody('street').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Street should be at least ' +
        '3 chars and at most 255 chars');

    // mission validation
    req.checkBody('mission').trim().escape().isLength({ min: 10, max: 2000 }).withMessage('Street should be at least ' +
        '10 chars and at most 2000 chars');

    var errors = req.validationErrors();
        if(errors){
            res.json(errors);
        }
        else {
            organizations.update({
                    facebook_id: req.body.facebook_id,
                    name: req.body.name,
                    picture: req.body.picture,
                    state: req.body.state,
                    city: req.body.city,
                    zip: req.body.zip,
                    street: req.body.street,
                    mission: req.body.mission,
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


module.exports = router;
