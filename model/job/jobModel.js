var express = require('express');
const { NotExtended } = require('http-errors');
var router = express.Router();
var appRoot = require('app-root-path').path.replace(/\\/g,"/");
var dbConObj = require(appRoot+"/conf/db_info");

var conn = dbConObj.init();//connection 생성
dbConObj.connect(conn);//connection 연결



/* job List. */
var jobList = {
  jobListArr : function(req, res, next){
      var sql = 'SELECT * FROM JOB_TBL ORDER BY JOB_IDX+0 LIMIT ? , ?';
      
      conn.query(sql,[startCnt,pageShow],function(err, results, field){
        req.paramResult=results;
        next(); 
      });
  },
  jobCnt : function(req, res, next){
    var sql = 'SELECT COUNT(*) AS CNT FROM JOB_TBL';
    
    conn.query(sql,function(err, results, field){
      req.paramResult=results;
      next();
    });
  }
};


module.exports = jobList;
