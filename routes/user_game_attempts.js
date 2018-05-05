var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var user_game_attempts = model.user_game_attempts;

//E1: GET all user_game_attempts by game_id and user_id

router.get('/:game_id/:user_id', function (req, res, next) {

    /**
     * Validations
     */

    // game_id validation
    req.checkParams('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Game Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // user_id validation
    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('User Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    user_game_attempts.findOne({
        attributes: ['id', 'score', 'won', 'created_at', 'updated_at'],
        where:{
            user_id: req.params.user_id,
            game_id: req.params.game_id
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

//E2: Add a user_game_attempt record
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // game_id validation
    req.checkParams('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Game Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // user_id validation
    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('User Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // score validation
    req.checkParams('score').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Score should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // won validation
    req.checkBody('won').trim().escape().isLength({ min: 1, max: 1 }).withMessage('Won should be at least ' +
        '1 char and at most 1 char').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        user_game_attempts.create({
            user_id: req.body.user_id,
            game_id: req.body.game_id,
            score: req.body.score,
            won: req.body.won,
            created_at: new Date(),
            updated_at: new Date()
        })
        .then(user_game_attempt => res.status(201).json({
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

//E3: Update a user_game_attempt record

/** Need to rethink about this route before deployment **/
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // game_id validation
    req.checkParams('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Game Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // user_id validation
    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('User Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // score validation
    req.checkParams('score').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Score should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // won validation
    req.checkBody('won').trim().escape().isLength({ min: 1, max: 1 }).withMessage('Won should be at least ' +
        '1 char and at most 1 char').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        user_game_attempts.update({
            score: req.body.score,
            won: req.body.won,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.id,
                user_id: req.params.user_id,
                game_id: req.params.game_id,
            }
        })
        .then(user_game_attempt => res.status(201).json({
            error: false,
            message: 'User Game Attempt Record updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
    }
});


module.exports = router;