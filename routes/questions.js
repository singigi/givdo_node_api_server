var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var questions = model.questions;

//D1: GET all questions
router.get('/', function (req, res, next) {
    questions.findAll({
            attributes: ['id', 'question_text', 'category_id', 'created_at', 'updated_at'],
            where: {'active': 1}
        })
        .then(questions => res.json({
        error: false,
        data: questions
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//D2: GET question by id
router.get('/:id', function (req, res, next) {
    questions.findAll({
            attributes: ['id', 'question_text', 'category_id', 'created_at', 'updated_at'],
            where:{
                id: req.params.id,
                'active': 1
            }})
        .then(questions => res.json({
        error: false,
        data: questions
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});



//D3: Add question
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // question validation
    req.checkBody('question_text').trim().escape().isLength({ min: 10, max: 2000 }).withMessage('Question should be at least ' +
        '10 chars and at most 2000 chars');

    // category_id validation
    req.checkBody('category_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Category Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');


    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        questions.create({
                question_text: req.body.question_text,
                category_id: req.body.category_id,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(question => res.status(201).json({
            error: false,
            data: question,
            message: 'New question created.'
        }))
    .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//D4: Update question
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('question_text').trim().escape().isLength({ min: 10, max: 2000 }).withMessage('Question should be at least ' +
        '10 chars and at most 2000 chars');

    req.checkBody('category_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Category Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');


    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        questions.update({
                question_text: req.body.question_text,
                category_id: req.body.category_id,
                updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
         .then(question => res.status(201).json({
            error: false,
            message: 'Question data updated.'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});

//D5: Inactivate question by id
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
        questions.update({
            active: 0,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(question => res.status(201).json({
            error: false,
            message: 'Question inactivated (to permanently delete all record, use database tools).'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});


module.exports = router;
