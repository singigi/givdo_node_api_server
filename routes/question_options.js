var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var question_options = model.question_options;

//?1: GET all question_option records by question_id
router.get('/:question_id', function (req, res, next) {

    /**
     * Validations
     */

    // question_id validation
    req.checkParams('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Question Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        question_options.findAll({
                attributes: ['id', 'text', 'question_id', 'is_correct', 'created_at', 'updated_at'],
                where: {
                    'active': 1,
                    'question_id': req.params.question_id
                }
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
    }
});

//?2: GET question option by question_id and question option id
router.get('/:question_id/:id', function (req, res, next) {

    /**
    * Validations
    */

    req.checkParams('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Question Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Question Option Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {

        question_options.findAll({
            attributes: ['id', 'text', 'question_id', 'is_correct', 'created_at', 'updated_at'],
            where:{
                id: req.params.id,
                question_id: req.params.question_id,
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
        }
});


//?3: Add question_option record
router.post('/insert',function (req, res, next) {

    
    req.checkBody('text').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Question option text should be at least ' +
        '2 chars and at most 255 chars');

    req.checkBody('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('question_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('is_correct').trim().escape().isLength({ min: 1, max: 1 }).withMessage('is_correct should be a single' +
        'digit (0 or 1)').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');


    var errors = req.validationErrors();
    var num;
    if(errors){
        res.json(errors);
    }
    else {
        
        question_options.count({
            where:{
                question_id: req.body.question_id,
                active: 1
            },
            })
            .then(c => {
                num = c;
            })
            .then(function(c){
                
                if(num <=3) {
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
                         message: 'New question_option record created.'
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
                        message: "A maximum of four options can be inserted for a single question"
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


//?4: Update question_option record 
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('text').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Question option text should be at least ' +
        '2 chars and at most 255 chars');

    req.checkBody('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('question_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('is_correct').trim().escape().isLength({ min: 1, max: 1 }).withMessage('is_correct should be a single' +
        'digit (0 or 1)').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

 
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
            message: 'question_option record updated.'
        }))
    .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});

//?5: Inactivate question_option record by id
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
        question_options.update({
            active: 0,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(question_option => res.status(201).json({
            error: false,
            message: 'question_option record inactivated (to permanently delete this record, use database tools).'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});


module.exports = router;
