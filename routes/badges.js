var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var badges = model.badges;

//B1: GET all badges
router.get('/', function (req, res, next) {
    badges.findAll({
        attributes: ['id', 'name', 'image_link', 'score', 'created_at', 'updated_at'],
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


//B2: GET badge by id
router.get('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        badges.findAll({
            attributes: ['id', 'name', 'image_link', 'score', 'created_at', 'updated_at'],
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
    }
});


//B3: Add badge
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabets are allowed');

    req.checkBody('image_link').trim().escape().isLength({ min: 15, max: 255 }).withMessage('Image Link should be at least ' +
        '15 chars and at most 255 chars');

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
             image_link: req.body.image_link,
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

//B4: Update badge
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('name').trim().escape().isLength({ min: 3, max: 255 }).withMessage('Name should be at least ' +
        '3 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabets are allowed');

    req.checkBody('image_link').trim().escape().isLength({ min: 15, max: 255 }).withMessage('Image Link should be at least ' +
        '15 chars and at most 255 chars');

    req.checkBody('score').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Score should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    
    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        badges.update({
            name: req.body.name,
            image_link: req.body.image_link,
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

//B5: Delete badge by id
router.delete('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    
    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        badges.update({
            active: 0,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(badge => res.status(201).json({
            error: false,
            message: 'Badge inactivated (to permanently delete all record, use database tools).'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});


module.exports = router;
