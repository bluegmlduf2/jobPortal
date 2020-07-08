var express = require('express');
var router = express.Router();

const data = { title: 'ejs init', message: 'Hello World' };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set(test='aaaaaaaaaaaaaaaaaa');
  console.log('%%%%%%%%%%%%%%');
  // console.log();
  // req.test='yyyyyyyyyyyyyyyyyyy';
  next();
});

module.exports = router;
