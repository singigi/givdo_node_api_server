var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var user_game_attempts = model.user_game_attempts;


//GET all user_game_attempt records
router.get('/', function (req, res, next) {

    /**
     * Validations
     */

    user_game_attempts.findAll({
        attributes: ['id', 'user_id', 'game_id', 'score', 'won', 'created_at', 'updated_at']
        })
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

//?2: GET user_game_attempt by user_id
router.get('/:user_id/', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    user_game_attempts.findAll({
        attributes: ['id', 'user_id', 'game_id', 'score', 'won', 'created_at', 'updated_at'],
        where:{
            user_id: req.params.user_id
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

//?3: GET user_game_attempt by user_id and game_id
router.get('/:user_id/:game_id/', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('game_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    user_game_attempts.findAll({
        attributes: ['id', 'user_id', 'game_id', 'score', 'won', 'created_at', 'updated_at'],
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

//?4: Add a user_game_attempt record
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');    

    req.checkBody('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('game_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('score').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Score should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

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
        message: 'New User Game Attempt record created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//?5: Update a user_game_attempt record; consider removing this route before deployment if a valid use is not found
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');    

    req.checkBody('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('game_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('score').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Score should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('won').trim().escape().isLength({ min: 1, max: 1 }).withMessage('Won should be at least ' +
        '1 char and at most 1 char').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        user_game_attempts.update({
            user_id: req.body.user_id,
            game_id: req.body.game_id,
            score: req.body.score,
            won: req.body.won,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.id                
            }
        })
        .then(user_game_attempt => res.status(201).json({
            error: false,
            message: 'User Game Attempt record updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
    }
});


module.exports = router;