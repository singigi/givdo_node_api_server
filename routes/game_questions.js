var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var game_questions = model.game_questions;

//H1: GET game_question records by game_id
router.get('/:game_id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('game_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    } 
    else {
        game_questions.findAll({
            attributes: ['game_id', 'question_id', 'created_at', 'updated_at'],
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
    }  
});

//E2: Add a game_question record
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('game_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('question_id should be at least ' +
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
            message: 'New game_question record created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});


module.exports = router;