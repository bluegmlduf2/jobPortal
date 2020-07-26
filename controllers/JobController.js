const express = require('express');
const jobModel = require('../model/JobModel');
const memberModel = require('../model/memberModel');
const Views = '../views/'

module.exports = {
  doGetJobList: function (req, res, next) {
    /* PAGING INIT*/
    var pageShow=8;//한 페이지당 8개
    var curPage=req.params.pageNum; //현재 선택 페이지 
    var startCnt=(curPage*pageShow)-8; //시작 페이지 수

    //Promise.all()은 모든 프로미스가 실행 된 후 then()이 실행된다.
    Promise.all([jobModel.getJobList(startCnt,pageShow),jobModel.jobCnt()]).then((result) => {
        
      /* PAGING */
      //var jobListArr=jobModel.jobListArr(startCnt,pageShow); //게시물 
      var jobList=result[0]; //게시물 
      var jobCnt=result[1][0].CNT; //게시물 총 갯수
      //var pageCntNow=Math.ceil(jobCnt/pageShow); //총 페이지 수

      /* PAGE BLOCK */ 
      var lastPage=Math.ceil(jobCnt/8);
      var pageBlock=5;//블록당 총 페이지 5장
      var curBlock=Math.ceil(curPage/pageBlock); //현재 블록 ceil(1/5)=1 ceil(6/5)=2
      var blockCnt=Math.ceil(lastPage/pageBlock);//마지막블록 ceil(9/8)=2
      var startBlock=(curBlock*5)-(pageBlock-1);//시작블록페이지
      var lastBlock=curBlock*pageBlock; //총 블록의 수
      var lastYN=false;

      if(blockCnt<=curBlock){
        lastBlock = lastPage;
        lastYN=true;
      }

      req.params.jobList=jobList;
      req.params.curPage=curPage;
      req.params.startBlock=startBlock;
      req.params.lastBlock=lastBlock;
      req.params.lastYN=lastYN;
      //console.log(req.params.jobList);
      
      next();//여기서 next()를 사용해줘야지 다음 요청(컨트롤러)으로 넘어감. //응답을 넘긴다
      //router.get(1,2..)을 통해 요청이 들어옴. get(1,2) 내부의 함수가 요청에 따라 실행. 요청이 끝날 경우 next()사용
    });
  },
  doGetJobSingleList: function (req, res, next) {
    var jobNum=req.params.jobNum; //job_idx

    Promise.all([jobModel.getJobSingleList(jobNum),jobModel.getJobCommentList(jobNum)]).then((result) => {
      req.params.jobSingleList=result[0];
      req.params.jobCommentList=result[1];
      next();
    });
  },
  doGetJobtype: function (req, res, next) {
    Promise.all([jobModel.getJobType()]).then((result) => {
      var jobType=result[0]; //JOB TYPE
      req.params.jobType=jobType;      
      next();
    });
  },
  doGetJobtypeDetail: function (req, res, next) {
    var jobType=req.body.jobType; 
    Promise.all([jobModel.getJobTypeDetail(jobType)]).then((result) => {
      var jobTypeDetail=result[0]; //JOB TYPE
      req.params.jobTypeDetail=jobTypeDetail;
      next();
    });
  }
}