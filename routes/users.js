var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

// GET users 
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



/* GET users listing
router.get('/', function(req, res, next) {
 
});*/
 
 
// POST user
router.post('/', function(req, res, next) {
 
});
 
 
// update user
router.put('/:id', function(req, res, next) {
 
});
 
 
// DELETE user
router.delete('/:id', function(req, res, next) {
 
});


module.exports = router;
