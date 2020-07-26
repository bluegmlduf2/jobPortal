var express = require('express');
var router = express.Router();
var indexController = require('../controllers/IndexController')
var jobController = require('../controllers/JobController')
var postController = require('../controllers/PostController')
var memberController = require('../controllers/MemberController')

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
router.get('/signup',jobController.doGetJobtype, function(req, res, next){
    res.render('signup', {JsonParam:JSON.parse(JSON.stringify(req.params))});
});

/* POST FILE&IMAGE UPLOAD  */
router.post('/new-post/imageUpload',postController.doInsertPostImage, function(req, res, next){
    res.send({"uploaded":req.params.status
    ,"fileName":req.params.filename
    ,"url":"/public/uploads/"+req.params.filename
    ,"error": {
        "message": "Uploads are completed."
    }
    });
});

/*POST SIGN */
//jobTypeDetail init
router.post('/signup/jobTypeDetail',jobController.doGetJobtypeDetail, function(req, res, next){
    res.send({JsonParam:JSON.parse(JSON.stringify(req.params))});
});
router.post('/signup/idCheck',memberController.doPostIdCheck, function(req, res, next){
    console.log(req.params);
    res.send({JsonParam:JSON.parse(JSON.stringify(req.params))});
});
router.post('/signup/mailCheck',memberController.doPostMailCheck, function(req, res, next){
    console.log(req.params);
    res.send({JsonParam:JSON.parse(JSON.stringify(req.params))});
});

module.exports = router;