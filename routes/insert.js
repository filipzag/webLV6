var express = require('express');
var router = express.Router();
var msql = require('mysql');
var path = require('path');

/* GET home page. */
router.post('/insertProject', function(req, res,next) {
  
   
 
 res.render(path.join(__dirname + '/../views/layout'),{});



});

module.exports = router;