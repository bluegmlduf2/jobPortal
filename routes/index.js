var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var indexRouter = require('./index/indexController');

/* GET home page. */
//console.log(appRoot.path);

router.get('/', indexRouter);

module.exports = router;
