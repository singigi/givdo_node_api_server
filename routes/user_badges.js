var express = require('express');
var router = express.Router();
var model = require('../models/index');
var sequelize = model.sequelize;
var check = require('express-validator/check');
var user_badges = model.user_badges;

//?1: GET user_badges by user_id
router.get('/:user_id', function (req, res, next) {

    /**
     * Validations
     */

    // user_id validation
    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        sequelize.query('SELECT `badges`.`id`, `badges`.`name`, `badges`.`image_link` FROM badges' +
        ' LEFT JOIN `user_badges` ON `badges`.`id` = `user_badges`.`badge_id` WHERE ' +
        'user_id = ' + req.params.user_id + ' AND `user_badges`.`active` = 1;', { type: sequelize.QueryTypes.SELECT })
        .then(user_badges => res.json({
            error: false,
            data: user_badges
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//?2: Add user_badge
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    // badge_id validation
    req.checkParams('badge_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('badge_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // user_id validation
    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        user_badges.create({
                badge_id: req.body.badge_id,
                user_id: req.body.user_id,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(user_badge => res.status(201).json({
            error: false,
            data: user_badge,
            message: 'New User Badge created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
    }
});

//?3: Inactivate a user_badge by badge_id and user_id
router.delete('/:user_id/:badge_id', function (req, res, next) {

    /**
     * Validations
     */

    // badge_id validation
    req.checkParams('badge_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('badge_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    // user_id validation
    req.checkParams('user_id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('user_id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        user_badges.update({
                active: 0,
                updated_at: new Date()
            }, {
                where: {
                    badge_id: req.params.badge_id,
                    user_id: req.params.user_id
                }
            })
            .then(user_badge => res.status(201).json({
            error: false,
            message: 'User Badge inactivated (to permanently delete all record, use database tools).'
        }))
        .catch(error => res.json({
            error: true,
            message: error
        }));
    }
});

module.exports = router;
