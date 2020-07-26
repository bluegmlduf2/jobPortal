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
  }
}