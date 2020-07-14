var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path').path.replace(/\\/g,"/");

var employerModel = require(appRoot+"/model/employer/employerModel");
var jobModel = require(appRoot+"/model/job/jobModel");
const url = require('url');

/* GET home page. */
//Paging Method
var indexPaging=function(req, res, next) {
    var pathname = url.parse(req.url).pathname.substring(1); //req는 웹의 requst요청에 대한 정보가지고있다
    res.render(pathname, { title: '1111' ,test:req.paramResult});
}

//app()과 달리 router()는 path 가 일치하거나 포함되는 path를 다 잡는다
router.get('/index',employerModel.memberList,indexPaging);
router.get('/job',jobModel,indexPaging);
router.get('/candidate', indexPaging);
router.get('/blog-single', indexPaging);
router.get('/contact', indexPaging);
router.get('/job-post', indexPaging);
router.get('/new-post', indexPaging);
router.get('/error', indexPaging);


//console.log( path.join(__dirname, "index.html"));


module.exports = router;