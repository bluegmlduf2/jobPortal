const mysql = require('mysql');

var appRoot = require('app-root-path').path.replace(/\\/g, "/");
const db = require(appRoot + "/conf/db_info");

module.exports = {
  //Select jobList 
  getCompanyList: function (empIdx) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COMPANY_IDX,EMP_IDX,COMPANY_NM,COMPANY_ADDR,COMPANY_TEL,COMPANY_EMAIL\
      FROM COMPANY_TBL\
      WHERE EMP_IDX=?'
      var execSql=con.query(
        sql, empIdx, (err, result, fields) => {
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