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
      ORDER BY J.JOB_DATE DESC \
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
      var sql = "SELECT J.JOB_IDX\
      ,J.COMPANY_IDX\
      ,J.JOB_TITLE\
      ,J.JOB_DATE\
      ,J.JOB_SUBTITLE\
      ,J.JOB_IMAGE\
      ,J.JOB_DESC\
      ,J.JOB_CONTENT\
      ,J.JOB_OPTION\
      ,(SELECT C.CODE_NAME FROM CODE_TBL AS C WHERE J.JOB_TIME=C.CODE_IDX) AS JOB_TIME\
      ,C.EMP_IDX\
      ,C.COMPANY_NM\
      ,COMPANY_ADDR\
      ,COMPANY_TEL\
      ,COMPANY_IMAGE\
      ,COMPANY_DATE\
      ,COMPANY_EMAIL\
      ,E.EMP_NM\
      ,E.EMP_INTRO\
      ,E.EMP_IMAGE\
      FROM JOB_TBL AS J\
      JOIN COMPANY_TBL AS C ON J.COMPANY_IDX = C.COMPANY_IDX\
      JOIN EMP_TBL AS E ON C.EMP_IDX = E.EMP_IDX\
      WHERE J.JOB_IDX=?"
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
      var sql = "SELECT JB.JOB_TBL_IDX,JB.JOB_GRP_IDX,JB.JOB_GRP_ORD,JB.JOB_GRP_DEN,JB.JOB_IDX,JB.JOB_WRITER,JB.JOB_TBL_DATE,CONCAT(LPAD('ㄴ',JB.JOB_GRP_DEN*3,' '),JB.JOB_COMMENT) AS JOB_COMMENT_HIE,JOB_COMMENT,\
      CASE WHEN NULLIF(E.EMP_IDX,'') IS NULL THEN C.CANDIDATE_IDX ELSE E.EMP_IDX END AS IDX,\
      CASE WHEN NULLIF(E.EMP_NM,'') IS NULL THEN C.CANDIDATE_NM ELSE E.EMP_NM END AS NM,\
      CASE WHEN NULLIF(E.EMP_IMAGE,'') IS NULL THEN C.CANDIDATE_IMAGE ELSE E.EMP_IMAGE END AS IMAGE\
    FROM JOB_BOARD_TBL AS JB\
    LEFT JOIN EMP_TBL AS E ON JB.JOB_WRITER =E.EMP_IDX\
    LEFT JOIN CANDIDATE_TBL AS C ON JB.JOB_WRITER =C.CANDIDATE_IDX\
    WHERE JB.JOB_IDX=?\
    ORDER BY JB.JOB_GRP_IDX,JB.JOB_GRP_ORD ASC";
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
  },
  //Select jobList 
  getJobType: function () {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT CODE_IDX,CODE_NAME\
      FROM CODE_TBL\
      WHERE SUBSTRING(CODE_IDX,1,1)="J" AND LENGTH(CODE_IDX) = 4'
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
  //Select jobDetailList 
  getJobTypeDetail: function (jobType) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT CODE_IDX,CODE_NAME\
      FROM CODE_TBL\
      WHERE SUBSTRING(CODE_IDX,1,4)=? AND LENGTH(CODE_IDX)=5'
      var execSql=con.query(
        sql,jobType,(err, result, fields) => {
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