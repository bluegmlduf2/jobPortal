var express = require('express');
var router = express.Router();

const data = { title: 'ejs init', message: 'Hello World' };

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
