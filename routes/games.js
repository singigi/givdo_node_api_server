var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var games = model.games;

//E1: GET all games by specified user_id

router.get('/:creator_user_id', function (req, res, next) {

    /**
     * Validations
     */

    // user_id validation
    req.checkParams('creator_user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('creator_user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        games.findAll({
            attributes: ['id', 'created_at', 'updated_at', 'finished_at', 'single_player'],
            where:{
                creator_user_id: req.params.creator_user_id
            }})
        .then(games => res.json({
            error: false,
            data: games
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//E2: Add a game record
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // user_id validation
    req.checkBody('creator_user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('creator_user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // single_player validation
    req.checkBody('single_player').trim().escape().isLength({ min: 1, max: 1 }).withMessage('Single Player should be at least ' +
        '1 char and at most 1 char').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        games.create({
            creator_user_id: req.body.creator_user_id,
            single_player: req.body.single_player,
            created_at: new Date(),
            updated_at: new Date(),
            finished_at: new Date()
        })
        .then(game => res.status(201).json({
            error: false,
            data: question,
            message: 'New Game created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});



//E3: Update a game record by game_id

/** Need to rethink about this route before deployment **/
router.put('/:game_id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('game_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // user_id validation
    req.checkBody('creator_user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('creator_user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // single_player validation
    req.checkBody('single_player').trim().escape().isLength({ min: 1, max: 1 }).withMessage('Single Player should be at least ' +
        '1 char and at most 1 char').matches(/^[0-1]$/i).withMessage('Only Boolean values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        games.update({
            single_player: req.body.single_player,
            updated_at: new Date()
        }, {
            where: {
                game_id: req.params.game_id,
                creator_user_id: req.body.creator_user_id
            }
        })
        .then(game => res.status(201).json({
            error: false,
            message: 'Game Record updated.'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});


module.exports = router;