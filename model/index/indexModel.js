var express = require('express');
var router = express.Router();

const data = { title: 'ejs init', message: 'Hello World' };

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log("#############"+req.params.test);
  res.render('index', { title: '222222222222222222' });
});

module.exports = router;
