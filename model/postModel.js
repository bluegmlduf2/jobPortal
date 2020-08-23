const mysql = require('mysql');

var appRoot = require('app-root-path').path.replace(/\\/g, "/");
const db = require(appRoot + "/conf/db_info");

module.exports = {
  putPost: function (jsonStr) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db); //con은 try밖에 있어야 finally에서 처리가능함
      var sql = 'INSERT INTO JOB_TBL(\
        JOB_IDX\
        ,COMPANY_IDX\
        ,JOB_TITLE\
        ,JOB_DATE\
        ,JOB_SUBTITLE\
        ,JOB_IMAGE\
        ,JOB_DESC\
        ,JOB_CONTENT\
        ,JOB_OPTION\
        ,JOB_TIME) VALUE(\
        (SELECT CONCAT("J",MAX(CAST(SUBSTRING(J.JOB_IDX,2)AS UNSIGNED))+1) FROM JOB_TBL AS J)\
        ,?\
        ,?\
        ,NOW()\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?)'

      var jsonObj = JSON.parse(jsonStr)

      const sqlParamArr = [
        jsonObj.COMPANY_IDX, jsonObj.JOB_TITLE, jsonObj.JOB_SUBTITLE, jsonObj.JOB_IMAGE, jsonObj.JOB_CONTENT, jsonObj.JOB_DESC, jsonObj.JOB_OPTION, jsonObj.JOB_TIME
      ];

      var execSql = con.query(sql, sqlParamArr, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });

      console.log(execSql.sql);
      con.end(); //비동기로 실행된 후 con.query()가 끝나는걸 대기함
    })
  },
  putInsertComment: function (jsonObj) {
    return new Promise((resolve, reject) => {
      // console.log(JSON.parse(JSON.stringify(jsonStr)));
      const con = mysql.createConnection(db); //con은 try밖에 있어야 finally에서 처리가능함
      var sql = 'INSERT INTO JOB_BOARD_TBL (\
        JOB_TBL_IDX\
        ,JOB_GRP_IDX\
        ,JOB_GRP_ORD\
        ,JOB_GRP_DEN\
        ,JOB_IDX\
        ,JOB_COMMENT\
        ,JOB_WRITER\
        ,JOB_TBL_DATE)\
        VALUES(\
        (SELECT MAX(JOB_TBL_IDX)+1 FROM JOB_BOARD_TBL AS A)\
        ,(CASE WHEN ? IS NULL THEN (SELECT IFNULL(MAX(JOB_GRP_IDX)+1,0) FROM JOB_BOARD_TBL AS B WHERE JOB_IDX=?) ELSE ? END)\
        ,(CASE WHEN ? IS NULL THEN 0 ELSE (SELECT IFNULL(MAX(JOB_GRP_ORD)+1,0) FROM JOB_BOARD_TBL AS C WHERE JOB_IDX=? AND JOB_GRP_IDX=?) END)\
        ,(CASE WHEN ? IS NULL THEN 0 ELSE (SELECT IFNULL(MAX(JOB_GRP_DEN)+1,0) FROM JOB_BOARD_TBL AS D WHERE JOB_IDX=? AND JOB_GRP_IDX=?) END)\
        ,?\
        ,?\
        ,?\
        ,NOW())';

      //var jsonObj = JSON.parse(jsonStr)
      // JOB_IDX: jobSingleList[0].JOB_IDX,
      // JOB_GRP_IDX: null,
      // JOB_COMMENT: null,
      // JOB_WRITER: LOGIN_GB
      const sqlParamArr = [
        jsonObj.JOB_GRP_IDX, jsonObj.JOB_IDX, jsonObj.JOB_GRP_IDX, jsonObj.JOB_GRP_IDX, jsonObj.JOB_IDX, jsonObj.JOB_GRP_IDX, jsonObj.JOB_GRP_IDX, jsonObj.JOB_IDX, jsonObj.JOB_GRP_IDX, jsonObj.JOB_IDX, jsonObj.JOB_COMMENT, jsonObj.JOB_WRITER
      ];

      var execSql = con.query(sql, sqlParamArr, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });

      console.log(execSql.sql);
      con.end();
    })
  },
  checkCommentChild: function (jsonObj) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COUNT(*) AS CNT FROM JOB_BOARD_TBL WHERE JOB_IDX=? AND JOB_GRP_IDX=?';

      const sqlParamArr = [
        jsonObj.JOB_IDX, jsonObj.JOB_GRP_IDX
      ];

      var execSql = con.query(sql, sqlParamArr, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });

      console.log(execSql.sql);
      con.end(); //비동기로 실행된 후 con.query()가 끝나는걸 대기함
    })
  },
  deleteComment: function (jsonObj) {
    return new Promise((resolve, reject) => {
      // console.log(JSON.parse(JSON.stringify(jsonStr)));
      const con = mysql.createConnection(db); //con은 try밖에 있어야 finally에서 처리가능함
      var sql = 'DELETE FROM JOB_BOARD_TBL WHERE JOB_TBL_IDX =?';

      const sqlParamArr = [
        jsonObj.JOB_TBL_IDX
      ];

      var execSql = con.query(sql, sqlParamArr, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });

      console.log(execSql.sql);
      con.end(); //비동기로 실행된 후 con.query()가 끝나는걸 대기함

    })
  }

}