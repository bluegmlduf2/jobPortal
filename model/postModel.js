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
        jsonObj.COMPANY_IDX
        , jsonObj.JOB_TITLE
        , jsonObj.JOB_SUBTITLE
        , jsonObj.JOB_IMAGE
        , jsonObj.JOB_CONTENT
        , jsonObj.JOB_DESC
        , jsonObj.JOB_OPTION
        , jsonObj.JOB_TIME
      ];

      var execSql = con.query(sql, sqlParamArr, (err, result, fields) => {
        if (err) {
          reject(err);
        }else{
          resolve();
        }      
      });

      console.log(execSql.sql);
      con.end(); //비동기로 실행된 후 con.query()가 끝나는걸 대기함
    })
  }
}