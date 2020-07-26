const mysql = require('mysql');
var appRoot = require('app-root-path').path.replace(/\\/g, "/");
const db = require(appRoot + "/conf/db_info");

module.exports = {
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
  }
}