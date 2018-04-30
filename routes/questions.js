var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var questions = model.questions;

//E1: GET all questions
router.get('/', function (req, res, next) {
    questions.findAll({
            attributes: ['id', 'question', 'category_id'],
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

//E2: GET question by id
router.get('/:id', function (req, res, next) {
    questions.findOne({
            attributes: ['id', 'question', 'category_id'],
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

//E3: Delete question by id
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
        questions.destroy({where: {
                id: req.params.id
            }})
            .then(status => res.status(201).json({
            error: false,
            message: 'Question has been deleted.'
        }))
    .catch(error => res.json({
            error: true,
            error: error
        }))
    }
});


//E4: Add question
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // question validation
    req.checkBody('question').trim().escape().isLength({ min: 10, max: 2000 }).withMessage('Question should be at least ' +
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
                question: req.body.question,
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

//E5: Update question
router.post('/:id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // question validation
    req.checkBody('question').trim().escape().isLength({ min: 10, max: 2000 }).withMessage('Question should be at least ' +
        '10 chars and at most 2000 chars');

    // category_id validation
    req.checkBody('category_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Category Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        questions.update({
                question: req.body.question,
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
            error: error
        }));
    }
});


module.exports = router;
