const mysql = require('mysql');

var appRoot = require('app-root-path').path.replace(/\\/g, "/");
const db = require(appRoot + "/conf/db_info");
const table = 'users';

module.exports = {
  //Select jobList 
  getJobList: function (startCnt, pageShow) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT * FROM JOB_TBL ORDER BY JOB_IDX+0 LIMIT ? , ?';
      con.query(
        sql, [startCnt, pageShow], (err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      con.end();
    });
  },
  //select job count
  jobCnt: function (req, res, next) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COUNT(*) AS CNT FROM JOB_TBL';
      con.query(
        sql, (err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      con.end();
    });
  },
  //for example
  getUser: function () {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      con.query(
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