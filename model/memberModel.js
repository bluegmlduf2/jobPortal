const mysql = require('mysql');
var appRoot = require('app-root-path').path.replace(/\\/g, "/");
const db = require(appRoot + "/conf/db_info");

module.exports = {
  //Select jobList 
  postIdCheck: function (id) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COUNT(*) AS CNT\
      FROM LOGIN_TBL\
      WHERE LOGIN_ID=?'
      var execSql=con.query(
        sql,id,(err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      console.log(execSql.sql);
      con.end();
    });
  },
  postMailCheck: function (mail) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COUNT(*) AS CNT\
      FROM LOGIN_TBL\
      WHERE LOGIN_MAIL=?'
      var execSql=con.query(
        sql,mail,(err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      console.log(execSql.sql);
      con.end();
    });
  },
  putLogin: function (param) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COUNT(*) AS CNT\
      FROM LOGIN_TBL\
      WHERE LOGIN_MAIL=?'
      var execSql=con.query(
        sql,mail,(err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      console.log(execSql.sql);
      con.end();
    });
  },
  putCandidate: function (sqlParam) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = "INSERT CANDIDATE_TBL (\
        CANDIDATE_IDX\
        ,CANDIDATE_NM\
        ,CANDIDATE_PHONE\
        ,CANDIDATE_ADDR\
        ,CANDIDATE_IMAGE\
        ,CANDIDATE_SEX\
        ,CANDIDATE_BIRTH\
        ,CANDIDATE_DATE\
        ,CANDIDATE_WANT\
        ,CANDIDATE_WANT_DETAIL)\
        VALUES(\
        (SELECT CONCAT('C',MAX(SUBSTRING(C.CANDIDATE_IDX,2))+1) FROM CANDIDATE_TBL AS C)\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?\
        ,NOW()\
        ,?\
        ,?)";
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log("아..마음에 안듬 변환 부분 data[NAME]");
      var sqlParamArr = [
        sqlParam['data[NAME]']
        ,sqlParam['data[PHONE]']
        ,sqlParam['data[ADDRESS]']
        ,sqlParam['data[CANDIDATE_IMAGE]']
        ,sqlParam['data[SEX]']
        ,sqlParam['data[BIRTH_DATE]']
        ,sqlParam['data[JOB_TYPE]']
        ,sqlParam['data[JOB_TYPE_DETAIL]']
      ];

      var execSql=con.query(
        sql,sqlParamArr,(err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      console.log(execSql.sql);
      con.end();
    });
  },
  putCandidateDetail: function (param) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COUNT(*) AS CNT\
      FROM LOGIN_TBL\
      WHERE LOGIN_MAIL=?'
      var execSql=con.query(
        sql,mail,(err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      console.log(execSql.sql);
      con.end();
    });
  }
}