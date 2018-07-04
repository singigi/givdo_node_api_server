var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var player_response = model.player_response;

//I1: GET all player responses; returns empty array if no active player response records exist
router.get('/', function (req, res, next) {
    player_response.findAll({
        attributes: ['id', 'user_id', 'game_id', 'question_id', 'question_option_id']        
    })
    .then(player_response => res.json({
        error: false,
        data: player_response
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//I2: GET player response by id; returns empty array if no active admin with specified id exists
router.get('/:id', function (req, res, next) {
    player_response.findAll({
        attributes: ['id', 'user_id', 'game_id', 'question_id', 'question_option_id'],
        where:{
            id: req.params.id            
        }})
        .then(player_response => res.json({
        error: false,
        data: player_response
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});


//I3: Add player response 
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed'); 

    req.checkBody('game_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('game_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');
        
    req.checkBody('question_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('question_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed'); 

    req.checkBody('question_option_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('question_option_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed'); 
   

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        player_response.create({
            user_id: req.body.user_id,
            game_id: req.body.game_id,
            question_id: req.body.question_id,
            question_option_id: req.body.question_option_id,
            created_at: new Date()
         })
         .then(player_response => res.status(201).json({
             error: false,
             data: player_response,
             message: 'New player response record created.'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
    }
});







module.exports = router;
