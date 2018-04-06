var express = require('express');
var router = express.Router();
var model = require('../models/index');

//E1: GET all users
router.get('/', function (req, res, next) {
  model.users.findAll({})
      .then(users => res.json({
          error: false,
          data: users
      }))
      .catch(error => res.json({
          error: true,
          data: [],
          error: error
      }));
}); 

//E2: GET user by id
router.get('/:id', function (req, res, next) {
    model.users.findAll({
        id: req.params.id
    })
        .then(users => res.json({
            error: false,
            data: users
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
  }); 

//E3: Delete user by id
router.delete('/:id', function (req, res, next) {
    model.users.destroy({where: {
        id: req.params.id
    }})
        .then(status => res.status(201).json({
            error: false,
            message: 'User has been deleted.'

        }))
        .catch(error => res.json({
            error: true,
            error: error
        }))
    });


//E4: Add user
//still need to validate email address
router.post('/insert', function (req, res, next) {

    model.users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            created_at: new Date(),
            updated_at: new Date()
        })
        .then(user => res.status(201).json({
            error: false,
            data: user,
            message: 'New user created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});

//E5: Update user
// still need to add email validation
router.post('/:id', function (req, res, next) {
 
    model.users.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            updated_at: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(user => res.status(201).json({
            error: false,
            message: 'User data updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});
 

module.exports = router;
