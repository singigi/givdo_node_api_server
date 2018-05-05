var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var games = model.games;

//E1: GET all games by user_id

router.get('/:user_id', function (req, res, next) {

    /**
     * Validations
     */

    // user_id validation
    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('User Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    games.findOne({
        attributes: ['id', 'created_at', 'updated_at', 'finished_at', 'single_player'],
        where:{
            creator_user_id: req.params.user_id
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
});

//E2: Add a game record
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // user_id validation
    req.checkBody('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('User Id should be at least ' +
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
            creator_user_id: req.body.user_id,
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
                id: req.params.id
                creator_user_id: req.body.user_id
            }
        })
        .then(game => res.status(201).json({
            error: false,
            message: 'Game Record updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
    }
});


module.exports = router;