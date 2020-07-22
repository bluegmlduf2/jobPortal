var express = require('express');
var router = express.Router();
var indexController = require('../controllers/IndexController')
var jobController = require('../controllers/JobController')
var postController = require('../controllers/PostController')


/*화면이동 */
router.get('/index', function(req, res, next){
    res.render('index', {JsonParam:JSON.parse(JSON.stringify(req.params))});
});
router.get('/job/:pageNum', jobController.doGetJobList,function(req, res, next){
    res.render('job', {JsonParam:JSON.parse(JSON.stringify(req.params))});
});
router.get('/job-single/:jobNum',jobController.doGetJobSingleList, function(req, res, next){
    res.render('job-single', {JsonParam:JSON.parse(JSON.stringify(req.params))});
});
router.get('/contact', function(req, res, next){
    res.render('job-single', {JsonParam:JSON.parse(JSON.stringify(req.params))});
});
router.get('/job-post', function(req, res, next){
    res.render('job-post', {JsonParam:JSON.parse(JSON.stringify(req.params))});
});
router.get('/new-post', function(req, res, next){
    res.render('new-post', {JsonParam:JSON.parse(JSON.stringify(req.params))});
});
router.get('/error', function(req, res, next){
    res.render('error', {JsonParam:JSON.parse(JSON.stringify(req.params))});
});

/* POST */
router.post('/new-post/upload',postController.doInsertPostImage, function(req, res, next){
    console.log('11111111111111111111111111111111111');
    res.render('new-post', {JsonParam:JSON.parse(JSON.stringify(req.params))});
});

module.exports = router;