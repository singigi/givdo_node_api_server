var express = require('express');
var router = express.Router();
var db = require('../models');

//use to access Sequelize model
var user = db.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
