var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var badges = model.badges;

//E1: GET all badges
router.get('/', function (req, res, next) {
    badges.findAll({
        attributes: ['id', 'name', 'score'],
        where: {'active': 1}
    })
    .then(badges => res.json({
        error: false,
        data: badges
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E2: GET badge by id
router.get('/:id', function (req, res, next) {
    badges.findOne({
        attributes: ['id', 'name', 'score'],
        where:{
            id: req.params.id,
            'active': 1
        }})
        .then(badges => res.json({
        error: false,
        data: badges
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//E3: Delete badge by id
router.delete('/:id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        badges.destroy({where: {
            id: req.params.id
        }})
        .then(status => res.status(201).json({
        error: false,
        message: 'Badge has been deleted.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }))
    }
});


//E4: Add badge
//still need to validate email address
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // name validation
    req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabets are allowed');

    // score validation
    req.checkBody('score').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Score should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        badges.create({
             name: req.body.name,
             score: req.body.score,
             created_at: new Date(),
             updated_at: new Date()
         })
         .then(badge => res.status(201).json({
             error: false,
             data: badge,
             message: 'New badge created.'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
    }
});

//E5: Update badge
// still need to add email validation
router.post('/:id', function (req, res, next) {

    /**
     * Validations
     */

    // id validation
    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // name validation
    req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabets are allowed');

    // score validation
    req.checkBody('score').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Score should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        badges.update({
            name: req.body.name,
            score: req.body.score,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(badge => res.status(201).json({
                error: false,
                message: 'Badge data updated.'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);


module.exports = router;
