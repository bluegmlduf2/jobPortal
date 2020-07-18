var express = require('express');
var router = express.Router();
var indexController = require('../controllers/IndexController')
var jobController = require('../controllers/JobController')

/*화면이동 */
router.get('/index', indexController.doIndexPage);
router.get('/job', jobController.doGetJobList,indexController.doIndexPage);
router.get('/candidate', indexController.doIndexPage);
router.get('/blog-single', indexController.doIndexPage);
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