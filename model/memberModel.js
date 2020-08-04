const mysql = require('mysql');
const mysqlAsync = require('mysql2/promise');
const appRoot = require('app-root-path').path.replace(/\\/g, "/");
let db = require(appRoot + "/conf/db_info");
const crypto = require('crypto'); //암호화
const { nextTick } = require('process');

module.exports = {
  //Select jobList 
  postIdCheck: function (id) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COUNT(*) AS CNT\
      FROM LOGIN_TBL\
      WHERE LOGIN_ID=?'
      var execSql = con.query(
        sql, id, (err, result, fields) => {
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
      var execSql = con.query(
        sql, mail, (err, result, fields) => {
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
  putLogin: function (parse) {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection(db);
      var sql = 'SELECT COUNT(*) AS CNT\
      FROM LOGIN_TBL\
      WHERE LOGIN_MAIL=?'
      var execSql = con.query(
        sql, mail, (err, result, fields) => {
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
      var execSql = con.query(
        sql, mail, (err, result, fields) => {
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
  putCandidate: async function(jsonStr){
    var jsonObj = JSON.parse(jsonStr)
    var cInsertId;
    //const connection = await pool.getConnection(async conn => conn);

    const pool = await mysqlAsync.createPool(db);
    const con= await pool.getConnection(async conn => conn);

    try {
      await con.beginTransaction() // START TRANSACTION 
       
      //CANDIDATE INSERT
      const sql1 = "INSERT CANDIDATE_TBL (\
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
        (SELECT CONCAT('C',MAX(CAST(SUBSTRING(C.CANDIDATE_IDX,2)AS UNSIGNED))+1) FROM CANDIDATE_TBL AS C)\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?\
        ,NOW()\
        ,?\
        ,?)";

      const sqlParamArr1 = [
        jsonObj.NAME
        , jsonObj.PHONE
        , jsonObj.ADDRESS
        , jsonObj.CANDIDATE_IMAGE
        , jsonObj.SEX
        , jsonObj.BIRTH_DATE
        , jsonObj.JOB_TYPE
        , jsonObj.JOB_TYPE_DETAIL
      ];

      const execSql1 =await con.query(sql1, sqlParamArr1)

      //LAST INSERTED KEY 
      const sql1_k = "SELECT MAX(A.CANDIDATE_IDX) AS CANDIDATE_IDX FROM (\
        SELECT CONCAT('C', MAX(CAST(SUBSTRING(CD.CANDIDATE_IDX,2) AS UNSIGNED))) AS CANDIDATE_IDX\
        FROM CANDIDATE_TBL AS CD) AS A";

      const execSql1_k =await con.query(sql1_k)
      console.log('lastInsertedKey::'+execSql1_k[0][0].CANDIDATE_IDX);
      cInsertId=execSql1_k[0][0].CANDIDATE_IDX;

      //CANDIDATE DETAIL INSERT
      const sql2 = "INSERT CANDIDATE_DETAIL_TBL(\
        CANDIDATE_DETAIL_IDX\
        ,CANDIDATE_IDX\
        ,CANDIDATE_INTRO)\
        VALUES (\
        (SELECT CONCAT('CD',MAX(CAST(SUBSTRING(CD.CANDIDATE_DETAIL_IDX,3)AS UNSIGNED))+1) FROM CANDIDATE_DETAIL_TBL AS CD)\
        ,?\
        ,?)";

      const sqlParamArr2 = [
        cInsertId
        , jsonObj.SELF_INTRODUCTION
      ];

      //ENCRYPTION 
      const execSql2 =await con.query(sql2, sqlParamArr2);
      console.log(execSql2.sql);
      var encryptionPass=crypto.createHash('sha256').update(jsonObj.PASSWORD).digest('hex')

      //LOGIN INSERT
      const sql3 = "INSERT LOGIN_TBL(\
        LOGIN_GB\
        ,LOGIN_ID\
        ,LOGIN_PASS\
        ,LOGIN_MAIL\
        ,LOGIN_LASTIN)\
        VALUES (\
        ?\
        ,?\
        ,?\
        ,?\
        ,NOW())";

      const sqlParamArr3 = [
        cInsertId
        , jsonObj.ID
        , encryptionPass
        , jsonObj.EMAIL
      ];

      const execSql3 =await con.query(sql3, sqlParamArr3);
      console.log(execSql3.sql);
      
      await con.commit() // COMMIT
      
      //async 함수의 반환형은 promise 이다 resolve(반환값)
      return Promise.resolve();
    } catch (err) {
      con.rollback()
      return Promise.reject(err);
    } finally {
      con.release(); // pool에 connection 반납
    }
  },
  putEmployer: async function(jsonStr){
    var jsonObj = JSON.parse(jsonStr)
    var cInsertId;

    const pool = await mysqlAsync.createPool(db);
    const con= await pool.getConnection(async conn => conn);

    try {
      await con.beginTransaction() // START TRANSACTION 
       
      //EMPLOYER INSERT
      const sql1 = "INSERT EMP_TBL (\
        EMP_IDX\
        ,EMP_NM\
        ,EMP_INTRO\
        ,EMP_IMAGE\
        )VALUES(\
        (SELECT CONCAT('E',MAX(CAST(SUBSTRING(C.EMP_IDX,2)AS UNSIGNED))+1) FROM EMP_TBL AS C)\
        ,?\
        ,?\
        ,?)";

      const sqlParamArr1 = [
        jsonObj.EMPLOYER_NAME
        , jsonObj.EMPLOYER_INTRODUCTION
        , jsonObj.EMPLOYER_IMAGE
      ];

      const execSql1 =await con.query(sql1, sqlParamArr1)

      //LAST INSERTED KEY 
      const sql1_k = "SELECT MAX(A.EMP_IDX) AS EMP_IDX FROM (\
            SELECT CONCAT('E', MAX(CAST(SUBSTRING(CD.EMP_IDX,2) AS UNSIGNED))) AS EMP_IDX\
            FROM EMP_TBL AS CD) AS A";

      const execSql1_k =await con.query(sql1_k)
      console.log('lastInsertedKey::'+execSql1_k[0][0].EMP_IDX);
      eInsertId=execSql1_k[0][0].EMP_IDX;

      //COMPANY INSERT
      const sql2 = "INSERT COMPANY_TBL(\
        COMPANY_IDX\
        ,EMP_IDX\
        ,COMPANY_NM\
        ,COMPANY_ADDR\
        ,COMPANY_TEL\
        ,COMPANY_IMAGE\
        ,COMPANY_DATE\
        ,COMPANY_EMAIL\
        ,COMPANY_TYPE)\
        VALUES (\
        (SELECT CONCAT('CM',MAX(CAST(SUBSTRING(CD.COMPANY_IDX,3)AS UNSIGNED))+1) FROM COMPANY_TBL AS CD)\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?\
        ,?)";

      const sqlParamArr2 = [
        eInsertId
        , jsonObj.COMPANY_NAME
        , jsonObj.COMPANY_ADDRESS
        , jsonObj.COMPANY_TELEPHONE_NUMBER
        , jsonObj.COMPANY_IMAGE
        , jsonObj.COMPANY_ESTABLISHMENT_DATE
        , jsonObj.COMPANY_EMAIL
        , jsonObj.JOB_TYPE
      ];

      const execSql2 =await con.query(sql2, sqlParamArr2);
      console.log(execSql2.sql);

      //LAST INSERTED KEY 
      const sql2_k = "SELECT MAX(A.COMPANY_IDX) AS COMPANY_IDX FROM (\
      SELECT CONCAT('CM', MAX(CAST(SUBSTRING(CD.COMPANY_IDX,3) AS UNSIGNED))) AS COMPANY_IDX\
      FROM COMPANY_TBL AS CD) AS A";

      const execSql2_k =await con.query(sql2_k)
      console.log('lastInsertedKey::'+execSql2_k[0][0].COMPANY_IDX);
      comInsertId=execSql2_k[0][0].COMPANY_IDX;

      //COMPANY DETAIL INSERT
      const sql3 = "INSERT COMPANY_DETAIL_TBL(\
        COMPANY_DETAIL_IDX\
        ,COMPANY_IDX\
        ,COMPANY_INTRO\
        )VALUES (\
        (SELECT CONCAT('CT',MAX(CAST(SUBSTRING(CD.COMPANY_DETAIL_IDX,3)AS UNSIGNED))+1) FROM COMPANY_DETAIL_TBL AS CD)\
        ,?\
        ,?)";

      const sqlParamArr3 = [
        comInsertId
        , jsonObj.COMPANY_INTRODUCTION
      ];

      const execSql3=await con.query(sql3, sqlParamArr3);
      console.log(execSql3.sql);
      
      //ENCRYPTION 
      var encryptionPass=crypto.createHash('sha256').update(jsonObj.PASSWORD).digest('hex')

      //LOGIN INSERT
      const sql4 = "INSERT LOGIN_TBL(\
        LOGIN_GB\
        ,LOGIN_ID\
        ,LOGIN_PASS\
        ,LOGIN_MAIL\
        ,LOGIN_LASTIN)\
        VALUES (\
        ?\
        ,?\
        ,?\
        ,?\
        ,NOW())";

      const sqlParamArr4 = [
        eInsertId
        , jsonObj.ID
        , encryptionPass
        , jsonObj.COMPANY_EMAIL
      ];

      const execSql4 =await con.query(sql4, sqlParamArr4);
      console.log(execSql4.sql);
      
      await con.commit() // COMMIT
      
      //async 함수의 반환형은 promise 이다 resolve(반환값)
      return Promise.resolve();
    } catch (err) {
      con.rollback()
      return Promise.reject(err);
    } finally {
      con.release(); // pool에 connection 반납
    }
  }
}