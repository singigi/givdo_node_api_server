var express = require('express');
var router = express.Router();
var model = require('../models/index');
var sequelize = model.sequelize;
var check = require('express-validator/check');
var user_causes = model.user_causes;

//?1: GET user_causes by user_id
router.get('/:user_id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    
    ar errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        sequelize.query('SELECT `causes`.`id`, `causes`.`name`, `causes`.`image_link` FROM causes' +
                ' LEFT JOIN `user_causes` ON `causes`.`id` = `user_causes`.`cause_id` WHERE ' +
                'user_id = ' + req.params.user_id + ' `user_causes`.`active` = 1')
            .then(user_causes => res.json({
            error: false,
            data: user_causes
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});


//?2: Add user_cause
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('cause_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('cause_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    
    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        user_causes.create({
                cause_id: req.body.cause_id,
                user_id: req.body.user_id,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(user_cause => res.status(201).json({
            error: false,
            data: user_cause,
            message: 'New User Cause created.'
        }))
    .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//?3: Inactivate a user_cause by user_id and cause_id 
router.delete('/:user_id/:cause_id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('cause_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('cause_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    
    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        user_causes.update({
                active: 0,
                updated_at: new Date()
            }, {
                where: {
                    cause_id: req.params.cause_id,
                    user_id: req.params.user_id
                }
            })
            .then(user_cause => res.status(201).json({
            error: false,
            message: 'User Cause inactivated (to permanently delete all record, use database tools).'
        }))
    .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});

module.exports = router;
