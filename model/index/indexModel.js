var express = require('express');
var router = express.Router();

const data = { title: 'ejs init', message: 'Hello World' };

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: '1111' ,test:req.paramResult});
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: '1111' ,test:req.paramResult});
});


module.exports = router;
