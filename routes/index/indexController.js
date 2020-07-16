var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path').path.replace(/\\/g,"/");
var employerModel = require(appRoot+"/model/employer/employerModel");
var indexModel = require(appRoot+"/model/index/indexModel");
var jobModel = require(appRoot+"/model/job/jobModel");

router.use(function (req, res, next) {
    /* PAGING */
    var pageCnt=5;//총 페이지 5장
    var pageShow=8;//한 페이지당 8개

    var curPage=1; //현재 선택 페이지 

    var endCnt=curPage*pageShow; //종료 페이지 수
    var startCnt=endCnt-8; //시작 페이지 수

    //var jobListArr=jobModel.jobListArr(startCnt,pageShow); //게시물 
    var jobListArr=jobModel.jobListArr; //게시물 

    var jobCnt=jobModel.jobCnt; //게시물 총 갯수
    var pageCntNow=Math.ceil(jobCnt/pageShow); //총 페이지 수

    /* PAGE BLOCK */ 
    var blockPer=pageCnt*pageShow;//블록 단위 40
    var blockCnt=Math.ceil(pageCntNow/blockPer); //총 블록의 수
    var curBlock=Math.ceil(endCnt/blockPer); //현재 블록

    var endBlock=curBlock*pageShow;//종료블록
    var startBlock=endBlock-pageCnt; //시작블록

    var rVal = {jobListArr : jobListArr
    , startBlock : startBlock
    , endBlock : endBlock
    };

    console.log(rVal);
console.log(jobListArr);
console.log(jobCnt);
    console.log('log:::::::::::::::',req.paramResult);
    next();
});



//app()과 달리 router()는 path 가 일치하거나 포함되는 path를 다 잡는다
router.get('/index',employerModel.memberList,indexModel.paging);
//router.get('/index/test',jobModel.memberList,indexModel.paging);
// router.get('/job',jobModel,indexPaging);
// router.get('/candidate', indexPaging);
// router.get('/blog-single', indexPaging);
// router.get('/contact', indexPaging);
// router.get('/job-post', indexPaging);
// router.get('/new-post', indexPaging);
// router.get('/error', indexPaging);


//console.log( path.join(__dirname, "index.html"));


module.exports = router;