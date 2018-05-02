var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var question_options = model.question_options;

//E1: GET all question options
router.get('/', function (req, res, next) {
    question_options.findAll({
            attributes: ['id', 'text', 'question_id', 'is_correct'],
            where: {'active': 1}
        })
        .then(question_options => res.json({
        error: false,
        data: question_options
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E2: GET question option by id
router.get('/:id', function (req, res, next) {
    question_options.findOne({
            attributes: ['id', 'text', 'question_id', 'is_correct'],
            where:{
                id: req.params.id,
                'active': 1
            }})
        .then(question_options => res.json({
        error: false,
        data: question_options
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E3: Delete question option by id
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
        question_options.destroy({where: {
                id: req.params.id
            }})
            .then(status => res.status(201).json({
            error: false,
            message: 'Question Option has been deleted.'
        }))
    .catch(error => res.json({
            error: true,
            error: error
        }))
    }
});


//E4: Add question option
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // text validation
    req.checkBody('text').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Question Option Text should be at least ' +
        '2 chars and at most 255 chars');

    // question_id validation
    req.checkBody('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Question Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // is_correct validation
    req.checkBody('is_correct').trim().escape().isLength({ min: 1, max: 1 }).withMessage('Is Correct should be at least ' +
        '1 char and at most 1 char').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {

        /**
         * Check Max 4 options limit per question
         */
        question_options.count({
            where:{
                question_id: req.body.question_id,
                active: 1
            },
            distinct: true,
            col: 'id'
            })
            .then(function(question_options){
                if(question_options <=3) {
                    question_options.create({
                         text: req.body.text,
                         question_id: req.body.question_id,
                         is_correct: req.body.is_correct,
                         created_at: new Date(),
                         updated_at: new Date()
                     })
                     .then(question => res.status(201).json({
                         error: false,
                         data: question,
                         message: 'New question Option Created.'
                     }))
                     .catch(error => res.json({
                         error: true,
                         data: [],
                         error: error
                     }));
                }
                else {
                    res.json({
                        error: true,
                        data: [],
                        message: "Maximum four options can be inserted against a question"
                    });
                }
            })
            .catch(error => res.json({
                error: true,
                data: [],
                error: error
            }));
    }
});

//E5: Update question option
router.post('/:id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // text validation
    req.checkBody('text').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Question Option Text should be at least ' +
        '2 chars and at most 255 chars');

    // question_id validation
    req.checkBody('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Question Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // is_correct validation
    req.checkBody('is_correct').trim().escape().isLength({ min: 1, max: 1 }).withMessage('Is Correct should be at least ' +
        '1 char and at most 1 char').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        question_options.update({
                text: req.body.text,
                question_id: req.body.question_id,
                is_correct: req.body.is_correct,
                updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(question => res.status(201).json({
            error: false,
            message: 'Question Option data updated.'
        }))
    .catch(error => res.json({
            error: true,
            error: error
        }));
    }
});


module.exports = router;
