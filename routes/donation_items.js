var express = require('express');
var router = express.Router();
var model = require('../models/index');
var check = require('express-validator/check');
var donation_items = model.donation_items;

//K1: GET all donation items; returns NULL if no active donation items exist
router.get('/', function (req, res, next) {
    donation_items.findAll({
        attributes: ['id', 'name', 'category', 'description'],
        where: {'active': 1}
    })
    .then(donation_items => res.json({
        error: false,
        data: donation_items
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});

//K2: GET donation item by id; returns NULL if no active admin with specified id exists
router.get('/:id', function (req, res, next) {
    donation_items.findAll({
        attributes: ['id', 'name', 'category', 'description'],
        where:{
            id: req.params.id,
            'active': 1
        }})
        .then(donation_items => res.json({
        error: false,
        data: donation_items
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});


//K3: Add donation item
router.post('/insert',function (req, res, next) {

    /**
     * Validations
     */


    req.checkBody('name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z0-9_]+$/i).withMessage('Only alphanumeric characters and underscores are allowed');
        
    req.checkBody('category').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Category should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic character are allowed');  
          
    req.checkBody('description').trim().escape().isLength({ min: 2, max: 1000 }).withMessage('Description should be at least ' +
        '2 chars and at most 1000 chars');    

 

    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        donation_items.create({
             name: req.body.name,
             category: req.body.category,
             description: req.body.description,
             created_at: new Date(),
             updated_at: new Date()
         })
         .then(donation_items => res.status(201).json({
             error: false,
             data: donation_items,
             message: 'New donation item created.'
         }))
         .catch(error => res.json({
             error: true,
             data: [],
             error: error
         }));
    }
});

//K4: Update donation item
router.put('/:id', function (req, res, next) {

    /**
     * Validations
     */

    req.checkParams('id').trim().escape().isLength({ min: 1, max: 11 }).withMessage('ID should be at least ' +
        '1 chars and at most 11 chars').isInt().withMessage('Only numeric values are allowed'); 

    req.checkBody('name').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Name should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z0-9_]+$/i).withMessage('Only alphanumeric characters and underscores are allowed');
        
    req.checkBody('category').trim().escape().isLength({ min: 2, max: 255 }).withMessage('Category should be at least ' +
        '2 chars and at most 255 chars').matches(/^[a-z\s]+$/i).withMessage('Only alphabetic character are allowed');  
          
    req.checkBody('description').trim().escape().isLength({ min: 2, max: 1000 }).withMessage('Description should be at least ' +
        '2 chars and at most 1000 chars'); 
    
    
    var errors = req.validationErrors();
    if(errors){
        res.json(errors);
    }
    else {
        donation_items.update({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(donation_items => res.status(201).json({
                error: false,
                message: 'Donation item data updated.'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);

//K5: Inactivate donation item by id
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
        donation_items.update({
            active: 0,
            updated_at: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(donation_items => res.status(201).json({
                error: false,
                message: 'Donation item inactivated (to permanently delete all record, use database tools).'
            }))
            .catch(error => res.json({
                error: true,
                error: error
            }));
        }
    }
);



module.exports = router;
