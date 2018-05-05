var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var causes = model.causes;

//E1: GET all causes
router.get('/', function (req, res, next) {
    causes.findAll({
            attributes: ['id', 'name'],
            where: {'active': 1}
        })
        .then(causes => res.json({
        error: false,
        data: causes
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E2: GET cause by id
router.get('/:id', function (req, res, next) {
    causes.findOne({
            attributes: ['id', 'name'],
            where:{
                id: req.params.id,
                'active': 1
            }})
        .then(causes => res.json({
        error: false,
        data: causes
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E3: Delete cause by id
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
        causes.update({
            active: 0,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(cause => res.status(201).json({
            error: false,
            message: 'Cause inactivated (to permanently delete all record, use database tools).'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});


//E4: Add cause
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // name validation
    req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabets are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        causes.create({
                name: req.body.name,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(cause => res.status(201).json({
            error: false,
            data: cause,
            message: 'New cause created.'
        }))
    .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//E5: Update cause
router.put('/:id', function (req, res, next) {

        /**
         * Validations
         */

            // id validation
        req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
            '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

        // name validation
        req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
            '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabets are allowed');

        var errors = req.validationErrors();
        if(errors){
            res.json(errors);
        }
        else {
            causes.update({
                    name: req.body.name,
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(cause => res.status(201).json({
                error: false,
                message: 'Cause data updated.'
            }))
        .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);


module.exports = router;
