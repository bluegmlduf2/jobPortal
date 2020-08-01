var express = require('express');
var url = require('url');
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
router.post('*/imageUpload',postController.doInsertPostImage, function(req, res, next){
    var rPath=url.parse(req.url,true).path;

    //POST IMAGE UPLOAD
    if(rPath=='/new-post/imageUpload'){
        // response.writeHead(200);
        // response.end(html); 
        //--> return res.send(html); //return은 생략가능
        res.send({"uploaded":req.params.status
        ,"fileName":req.params.filename
        ,"url":"/public/uploads/"+req.params.filename
        ,"error": {
            "message": "Uploads are completed."
        }
        });
    //SIGN UP IMAGE UPLOAD
    }else if(rPath=='/signup/candidate/imageUpload'){
        res.send({"uploaded":req.params.status
        ,"fileName":req.params.filename
        ,"url":"/public/uploads/candidate/"+req.params.filename
        });
    }else if(rPath=='/signup/employer/imageUpload'){
        res.send({"uploaded":req.params.status
        ,"fileName":req.params.filename
        ,"url":"/public/uploads/employer/"+req.params.filename
        });
    }else if(rPath=='/signup/company/imageUpload'){
        res.send({"uploaded":req.params.status
        ,"fileName":req.params.filename
        ,"url":"/public/uploads/company/"+req.params.filename
        });
    }
});


/*POST SIGN */
//jobTypeDetail init
router.post('/signup/jobTypeDetail',jobController.doGetJobtypeDetail, function(req, res, next){
    res.send({JsonParam:JSON.parse(JSON.stringify(req.params))});
});
//ID CHECK
router.post('/signup/idCheck',memberController.doPostIdCheck, function(req, res, next){
    console.log(req.params);
    res.send({JsonParam:JSON.parse(JSON.stringify(req.params))});
});
//MAIL CHECK
router.post('/signup/mailCheck',memberController.doPostMailCheck, function(req, res, next){
    console.log(req.params);
    res.send({JsonParam:JSON.parse(JSON.stringify(req.params))});
});
//INSERT CANDIDATE
router.put('/signup/insertCandidate',memberController.doPutCandidate, function(err,req, res, next){
    if(err){
        next(err)//에러가 있을 경우 app.js의 ERROR HANDELING에게 던짐
    }else{
        //res.send('문제없음^^');
         //에러가 없을시 라우터 레벨(routes.js)에서 res를 반환하고 끝냄
        //res.send() 혹은 res.end()등을 사용하는 순간 해당 request를 끝냄 
        //res.send()를 사용해야하는 이유는 ajax에서 응답을 기다리고있기 때문이라고 생각
    }
});

module.exports = router;