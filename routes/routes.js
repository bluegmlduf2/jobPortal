var express = require('express');
var url = require('url');
var router = express.Router();
var indexController = require('../controllers/IndexController')
var jobController = require('../controllers/JobController')
var postController = require('../controllers/PostController')
var memberController = require('../controllers/MemberController')
var companyController = require('../controllers/CompanyController')

/***************************** PAGE INDEX  ********************************/
router.get('/index', function (req, res, next) {
    res.render('index', {
        JsonParam: JSON.parse(JSON.stringify(req.params))
        ,session: req.session.result == null ? null : req.session.result
        ,loginChk:undefined
    });
});
router.get('/job/:pageNum', jobController.doGetJobList, function (req, res, next) {
    res.render('job', {
        JsonParam: JSON.parse(JSON.stringify(req.params)),
        session: req.session.result == null ? null : req.session.result
    });
});
router.get('/job-single/:jobNum', jobController.doGetJobSingleList, function (req, res, next) {
    res.render('job-single', {
        JsonParam: JSON.parse(JSON.stringify(req.params)),
        session: req.session.result == null ? null : req.session.result
    });
});
router.get('/contact', function (req, res, next) {
    res.render('contact', {
        JsonParam: JSON.parse(JSON.stringify(req.params)),
        session: req.session.result == null ? null : req.session.result
    });
});
router.get('/job-post', function (req, res, next) {
    res.render('job-post', {
        JsonParam: JSON.parse(JSON.stringify(req.params)),
        session: req.session.result == null ? null : req.session.result
    });
});
router.get('/new-post',companyController.doGetCompanyList, function (req, res, next) {
    //LOGIN CHECK
    if(req.session.result!=undefined){
        var loginGb=req.session.result[0].LOGIN_GB.substring(0,1) //for checking candidate or employer
        if(loginGb=='C'){
            res.render('index', {
                JsonParam: JSON.parse(JSON.stringify(req.params))
                ,session: req.session.result == null ? null : req.session.result
                ,loginChk: 2 //2 == not permit to login candidate
            });
        }
        res.render('new-post', {//Success
            JsonParam: JSON.parse(JSON.stringify(req.params)),
            session: req.session.result == null ? null : req.session.result
        });    
    }else{
        //NOT LOGINED
        res.render('index', {
            loginChk: 1 //1 == not login
            ,session: req.session.result == null ? null : req.session.result
        });
    }

});
router.get('/error', function (req, res, next) {
    res.render('error', {
        JsonParam: JSON.parse(JSON.stringify(req.params)),
        session: req.session.result == null ? null : req.session.result
    });
});
router.get('/signup', jobController.doGetJobtype, function (req, res, next) {
    res.render('signup', {
        JsonParam: JSON.parse(JSON.stringify(req.params)),
        session: req.session.result == null ? null : req.session.result
    });
});

/***************************** POST FILE&IMAGE UPLOAD  *****************************/
router.post('*/imageUpload', postController.doInsertPostImage, function (req, res, next) {
    var rPath = url.parse(req.url, true).path;

    //POST IMAGE UPLOAD
    if (rPath == '/new-post/imageUpload') {
        //CKEditor Imageupload
        res.send({
            "uploaded": req.params.status,
            "fileName": req.params.filename,
            "url": "/public/uploads/post/" + req.params.filename,
            "error": {
                "message": "Uploads are completed."
            }
        });
        // IMAGE UPLOAD
    } else if (rPath == '/signup/candidate/imageUpload') {
        res.send({
            "uploaded": req.params.status,
            "fileName": req.params.filename,
            "url": "/public/uploads/candidate/" + req.params.filename
        });
    } else if (rPath == '/signup/employer/imageUpload') {
        res.send({
            "uploaded": req.params.status,
            "fileName": req.params.filename,
            "url": "/public/uploads/employer/" + req.params.filename
        });
    } else if (rPath == '/signup/company/imageUpload') {
        res.send({
            "uploaded": req.params.status,
            "fileName": req.params.filename,
            "url": "/public/uploads/company/" + req.params.filename
        });
    }else if (rPath == '/job/imageUpload') {
        res.send({
            "uploaded": req.params.status,
            "fileName": req.params.filename,
            "url": "/public/uploads/job/" + req.params.filename
        });
    }
});


/***************************** SIGN UP PAGE  ********************************/
//jobTypeDetail init
router.post('/signup/jobTypeDetail', jobController.doGetJobtypeDetail, function (req, res, next) {
    res.send({
        JsonParam: JSON.parse(JSON.stringify(req.params))
    });
});
//ID CHECK
router.post('/signup/idCheck', memberController.doPostIdCheck, function (req, res, next) {
    console.log(req.params);
    res.send({
        JsonParam: JSON.parse(JSON.stringify(req.params))
    });
});
//MAIL CHECK
router.post('/signup/mailCheck', memberController.doPostMailCheck, function (req, res, next) {
    console.log(req.params);
    res.send({
        JsonParam: JSON.parse(JSON.stringify(req.params))
    });
});

//INSERT CANDIDATE
router.put('/signup/insertCandidate', memberController.doPutCandidate, function (err, req, res, next) {
    if (err) {
        next(err) //에러가 있을 경우 app.js의 ERROR HANDELING에게 던짐
    } else {
        //res.send('문제없음^^');
        //에러가 없을시 라우터 레벨(routes.js)에서 res를 반환하고 끝냄
        //res.send() 혹은 res.end()등을 사용하는 순간 해당 request를 끝냄 
        //res.send()를 사용해야하는 이유는 ajax에서 응답을 기다리고있기 때문이라고 생각
    }
});

//INSERT EMPLOYER
router.put('/signup/insertEmployer', memberController.doPutEmployer, function (err, req, res, next) {
    if (err) {
        next(err) //에러가 있을 경우 app.js의 ERROR HANDELING에게 던짐
    }
});

/***************************** LOG IN PAGE  ********************************/
//LOG IN
router.post('/login', memberController.doPostLogin, function (req, res, next) {
    res.send({
        JsonParam: JSON.parse(JSON.stringify(req.params)),
        session: req.session.result == null ? null : req.session.result
    });
});

router.post('/logout', function (req, res, next) {
    //delete ssesion
    req.session.destroy(function () {
        req.session;
    });
    
    res.end();
});



module.exports = router;