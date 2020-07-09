var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path').path.replace(/\\/g,"/");
var indexModel = require(appRoot+"/model/index/indexModel");
var employerModel = require(appRoot+"/model/employer/employerModel");
const url = require('url');

/* GET home page. */
//Paging Method
var indexPaging=function(req, res, next) {
    var pathname = url.parse(req.url).pathname.substring(1); //req는 웹의 requst요청에 대한 정보가지고있다
    res.render(pathname, { title: '1111' ,test:req.paramResult});
}


//app()과 달리 router()는 path 가 일치하거나 포함되는 path를 다 잡는다
router.get('/index',employerModel.memberList,indexPaging);
router.get('/about',indexPaging);
  
//console.log( path.join(__dirname, "index.html"));


module.exports = router;