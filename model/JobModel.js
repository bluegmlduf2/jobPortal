const mysql = require('mysql');

var appRoot = require('app-root-path').path.replace(/\\/g, "/");
const db = require(appRoot + "/conf/db_info");
const table = 'users';

module.exports = {
  //Select jobList 
  getJobList: function (startCnt, pageShow) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT J.*,E.EMP_NM,( \
        SELECT COUNT(JB.JOB_IDX) AS CNT \
        FROM JOB_BOARD_TBL AS JB \
        WHERE JB.JOB_IDX=J.JOB_IDX) AS COM_CNT \
      FROM JOB_TBL AS J \
      JOIN COMPANY_TBL AS C ON J.COMPANY_IDX = C.COMPANY_IDX \
      JOIN EMP_TBL AS E ON C.EMP_IDX=E.EMP_IDX \
      ORDER BY J.JOB_IDX+0 ASC \
       LIMIT ? , ?'
      var execSql=con.query(
        sql, [startCnt, pageShow], (err, result, fields) => {
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
  //select job count
  jobCnt: function () {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COUNT(*) AS CNT FROM JOB_TBL';
      var execSql=con.query(
        sql, (err, result, fields) => {
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
  getJobSingleList: function (jobNum) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT J.*,E.EMP_NM,E.EMP_INTRO,EMP_IMAGE \
      FROM JOB_TBL AS J \
      JOIN COMPANY_TBL AS C ON J.COMPANY_IDX = C.COMPANY_IDX \
      JOIN EMP_TBL AS E ON C.EMP_IDX=E.EMP_IDX \
      WHERE J.JOB_IDX=? \
      ORDER BY J.JOB_IDX+0 ASC '
      var execSql=con.query(
        sql,jobNum,(err, result, fields) => {
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
  getJobCommentList: function (jobNum) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT * FROM JOB_BOARD_TBL AS JB \
      WHERE JB.JOB_IDX=?';
      var execSql=con.query(
        sql,jobNum,(err, result, fields) => {
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
  //for example
  getUser: function () {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var execSql=con.query(
        `select id, name, date_format(birthdate,"%Y/%m/%d")
       as birthdate from ${table}`, (err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      con.end();
    });
  }
}