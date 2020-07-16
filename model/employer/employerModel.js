var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path').path.replace(/\\/g,"/");
var dbConObj = require(appRoot+"/conf/db_info");

var conn = dbConObj.init();//connection 생성
dbConObj.connect(conn);//connection 연결

const data = { title: 'ejs init', message: 'Hello World' };

/* GET home page. */
var memberModel = {
  //멤버리스트
  memberList : function(req,res,next){
      //var sql = 'SELECT * FROM BOARD_TBL WHERE B_CD = ?'; // 클럽목록
      var sql = 'SELECT * FROM BOARD_TBL';
      
      conn.query(sql,function(err, results, field){
          //res.render('member/member_list', {data : 'testData list ejs', memberList : results});
          //console.log("###########"+results);
          req.paramResult=results;
          next();
      });
  }
};


module.exports = memberModel;
