var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var game_questions = model.game_questions;

//E1: GET all game_questions by game_id

router.get('/:game_id', function (req, res, next) {

    /**
     * Validations
     */

    // game_id validation
    req.checkParams('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Game Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    game_questions.findAll({
        attributes: ['question_id', 'created_at', 'updated_at'],
        where:{
            game_id: req.params.game_id
        }})
        .then(game_questions => res.json({
            error: false,
            data: game_questions
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});

//E2: Add a game_question record
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // game_id validation
    req.checkBody('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Game Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // question_id validation
    req.checkBody('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Question Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        game_questions.create({
            game_id: req.body.game_id,
            question_id: req.body.question_id,
            created_at: new Date(),
            updated_at: new Date()
        })
        .then(game_question => res.status(201).json({
            error: false,
            data: question,
            message: 'New Game Question created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//E3: Update a game_question record by id and game_id

/** Need to rethink about this route before deployment **/
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // game_id validation
    req.checkBody('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Game Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // question_id validation
    req.checkBody('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Question Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        game_questions.update({
            question_id: req.body.question_id,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.id,
                game_id: req.body.game_id
            }
        })
        .then(game_question => res.status(201).json({
            error: false,
            message: 'Game Question Record updated.'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});


module.exports = router;