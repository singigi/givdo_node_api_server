var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var question_categories = model.question_categories;

//?1: GET all question_category records
router.get('/', function (req, res, next) {
    question_categories.findAll({
            attributes: ['id', 'name', 'created_at', 'updated_at'],
            where: {'active': 1}
        })
        .then(question_categories => res.json({
        error: false,
        data: question_categories
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//?2: GET question_category record by id
router.get('/:id', function (req, res, next) {

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
        question_categories.findAll({
            attributes: ['id', 'name', 'created_at', 'updated_at'],
            where:{
                id: req.params.id,
                'active': 1
            }})
        .then(question_categories => res.json({
        error: false,
        data: question_categories
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
}
    
});


//?3: Add question_category record
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabet characters are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        question_categories.create({
                name: req.body.name,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(question_category => res.status(201).json({
            error: false,
            data: question_category,
            message: 'New Question Category created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//?4: Update question_category record
router.put('/:id', function (req, res, next) {

        /**
         * Validations
         */

        req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
            '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

        req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
            '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabet characters are allowed');

        var errors = req.validationErrors();
        if(errors){
            res.json(errors);
        }
        else {
            question_categories.update({
                    name: req.body.name,
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(question_category => res.status(201).json({
                error: false,
                message: 'Question Category data updated.'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);

//?5: Inactivate question_category record by id
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
        question_categories.update({
                active: 0,
                updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(question_category => res.status(201).json({
            error: false,
            message: 'Question Category inactivated (to permanently delete all record of this ad, use database tools).'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});


module.exports = router;
