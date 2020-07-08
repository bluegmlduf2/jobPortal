var express = require('express');
var router = express.Router();
var indexRouter = require('./index/indexController');

/* GET home page. */

router.get('/', indexRouter);

module.exports = router;
