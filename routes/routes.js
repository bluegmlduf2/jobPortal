var express = require('express');
var router = express.Router();
var indexController = require('../controllers/IndexController')
var jobController = require('../controllers/JobController')

/*화면이동 */
router.get('/index', function(req, res, next){
    res.render('index', { title: '1111' ,JsonParam:JSON.parse(JSON.stringify(req.params))});
});
router.get('/job/:pageNum', jobController.doGetJobList,function(req, res, next){
    res.render('job', { title: '1111' ,JsonParam:JSON.parse(JSON.stringify(req.params))});
});

router.get('/job-single/:jobNum',jobController.doGetJobSingleList, function(req, res, next){
    res.render('job-single', { title: '1111' ,JsonParam:JSON.parse(JSON.stringify(req.params))});
});
//router.get('/candidate', indexController.doIndexPage);
router.get('/contact', indexController.doIndexPage);
router.get('/job-post', indexController.doIndexPage);
router.get('/new-post', indexController.doIndexPage);
router.get('/error', indexController.doIndexPage);


/*JOB */
// router.get('/job/joblist', userController.doGetUser);
// router.post('/job/joblist', userController.doGetUser);
// router.put('/job/joblist', userController.doGetUser);
// router.delete('/job/joblist', userController.doGetUser);

module.exports = router;