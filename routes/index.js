var express = require('express');
var router = express.Router();
var indexController = require('./index/indexController');

/* GET home page. */

router.get('/index', indexController);
// router.get('/job', indexController);
// router.get('/candidate', indexController);
// router.get('/blog-single', indexController);
// router.get('/contact', indexController);
// router.get('/job-post', indexController);
// router.get('/new-post', indexController);
// router.get('/error', indexController);


module.exports = router;
