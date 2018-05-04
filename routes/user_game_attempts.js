var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var user_game_attempts = model.user_game_attempts;

//E1: GET all user_game_attempts by user_id

router.get('/:user_id', function (req, res, next) {

    /**
     * Validations
     */

    // user_id validation
    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('User Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    user_game_attempts.findOne({
            attributes: ['id', 'created_at', 'updated_at', 'finished_at', 'single_player'],
            where:{
                creator_user_id: req.params.user_id
            }})
        .then(user_game_attempts => res.json({
        error: false,
        data: user_game_attempts
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E2: Add a user_game_attempt
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // user_id validation
    req.checkBody('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('User Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // is_correct validation
    req.checkBody('single_player').trim().escape().isLength({ min: 1, max: 1 }).withMessage('Single Player should be at least ' +
        '1 char and at most 1 char').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        user_game_attempts.create({
                creator_user_id: req.body.user_id,
                single_player: req.body.single_player,
                created_at: new Date(),
                updated_at: new Date(),
                finished_at: new Date()
            })
            .then(question => res.status(201).json({
            error: false,
            data: question,
            message: 'New User Game Attempt created.'
        }))
    .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//E3: Update a user_game_attempt
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // user_id validation
    req.checkBody('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('User Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // is_correct validation
    req.checkBody('single_player').trim().escape().isLength({ min: 1, max: 1 }).withMessage('Single Player should be at least ' +
        '1 char and at most 1 char').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        user_game_attempts.update({
                question_text: req.body.question,
                category_id: req.body.category_id,
                updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(question => res.status(201).json({
            error: false,
            message: 'User Game Attempt updated.'
        }))
    .catch(error => res.json({
            error: true,
            error: error
        }));
    }
});


module.exports = router;
