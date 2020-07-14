var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();
var appRoot = require('app-root-path').path.replace(/\\/g,"/");
var dbConObj = require(appRoot+"/conf/db_info");

var conn = dbConObj.init();//connection 생성
dbConObj.connect(conn);//connection 연결

/* PAGING */
var pageCnt=5;//총 페이지 5장
var pageShow=8;//한 페이지당 8개

var curPage=1; //현재 선택 페이지 

var endCnt=curPage*pageShow; //종료 페이지 수
var startCnt=endCnt-8; //시작 페이지 수

var jobListArr=jobListArr; //게시물 

var jobCnt=jobCnt; //게시물 총 갯수
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

/* job List. */
var jobList = {
  jobListArr : function(){
      var sql = 'SELECT * FROM JOB_TBL ORDER BY JOB_IDX+0 LIMIT ? , ?';
      
      conn.query(sql,[startCnt,pageShow],function(err, results, field){
        return results;
      });
  },
  jobCnt : function(){
    var sql = 'SELECT COUNT(*) AS CNT FROM JOB_TBL';
    
    conn.query(sql,function(err, results, field){
      return results;
    });
}
};
console.log(rVal);
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});


module.exports = rVal;
