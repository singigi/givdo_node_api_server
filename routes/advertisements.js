var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var ads = model.advertisements;

//Q1: GET all advertisements; returns NULL if no active ads exist
router.get('/', function (req, res, next) {
    ads.findAll({
        attributes: ['id', 'company_name', 'image_link', 'impressions', 'default' ],
        where: {'active': 1}
    })
    .then(ads => res.json({
        error: false,
        data: ads
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//Q2: GET advertisement by id; returns NULL if no active ad with specified id exists
router.get('/:id', function (req, res, next) {
    ads.findAll({
        attributes: ['id', 'company_name', 'image_link', 'impressions', 'default' ],
        where:{
            id: req.params.id,
            'active': 1
        }})
        .then(ads => res.json({
        error: false,
        data: ads
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});



//Q3: Add advertisement
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */

    req.checkBody('company_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('company_name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z0-9 ]+$/i).withMessage('Only alphanumeric characters and spaces are allowed');


    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        ads.create({
             company_name: req.body.company_name,
             image_link: req.body.image_link,
             created_at: new Date(),
             updated_at: new Date()
         })
         .then(ads => res.status(201).json({
             error: false,
             data: ads,
             message: 'New advertisement created.'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
    }
});

//Q4: Update advertisement by id; will update active or inactive ads
//Will only update an EXISTING ads with the given id; non-existing ads will not be created.
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('Id should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed');

    req.checkBody('company_name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('company_name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z0-9 ]+$/i).withMessage('Only alphanumeric characters and spaces are allowed');


    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        ads.update({
            company_name: req.body.company_name,
            image_link: req.body.image_link,
            updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(ads => res.status(201).json({
                error: false,
                message: 'Advertisement data updated.'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);

//Q5: Inactivate advertisement by id
/***** MUST UPDATE DOCS *****/
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
        ads.update({
            active: 0,
            updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(ads => res.status(201).json({
                error: false,
                message: 'Advertisement inactivated (to permanently delete all record of this ad, use database tools).'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);

module.exports = router;
