var express = require('express');
var router = express.Router();
var indexController = require('./index/indexController');

/* GET home page. */

router.get('/index', indexController);
router.get('/about', indexController);


module.exports = router;
