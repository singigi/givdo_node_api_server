var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var player_response = model.player_response;

//?1: GET all player responses; returns NULL if no active player response items exist
router.get('/', function (req, res, next) {
    player_response.findAll({
        attributes: ['user_id', 'item_id', 'organization_id', 'is_monetary', 'amount']        
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

//?2: GET player response by id; returns NULL if no active admin with specified id exists
router.get('/:id', function (req, res, next) {
    player_response.findAll({
        attributes: ['user_id', 'item_id', 'organization_id', 'is_monetary', 'amount'],
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


//?3: Add player response 
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed'); 

    req.checkBody('item_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('item_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');
        
    req.checkBody('organization_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('organization_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed'); 
        
    req.checkBody('is_monetary').trim().escape().isLength({ min: 1, max: 1 }).withMessage('is_monetary should be a ' +
        '1one digit boolean value (0 or 1)').matches(/^[0-1]$/i).withMessage('Only binary values (1 for TRUE and 0 for FALSE) are allowed');     

    req.checkBody('amount').trim().escape().isLength({ min: 1, max: 11 }).withMessage('amount should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');
   

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        player_response.create({
            user_id: req.body.user_id,
            item_id: req.body.item_id,
            organization_id: req.body.organization_id,
            is_monetary: req.body.is_monetary,
            amount: req.body.amount,
            created_at: new Date(),
            updated_at: new Date()
         })
         .then(player_response => res.status(201).json({
             error: false,
             data: player_response,
             message: 'New player response item created.'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
    }
});







module.exports = router;
