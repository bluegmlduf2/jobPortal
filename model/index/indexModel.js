var express = require('express');
var router = express.Router();
const url = require('url');
// const data = { title: 'ejs init', message: 'Hello World' };

// /* GET home page. */
// router.get('/index', function(req, res, next) {
//   res.render('index', { title: '1111' ,test:req.paramResult});
// });

// router.get('/about', function(req, res, next) {
//   res.render('index', { title: '1111' ,test:req.paramResult});
// });

// // const url = require('url');

// /* GET home page. */
// //Paging Method
// var indexPaging=function(req, res, next) {
//     var pathname = url.parse(req.url).pathname.substring(1); //req는 웹의 requst요청에 대한 정보가지고있다
//     res.render(pathname, { title: '1111' ,test:req.paramResult});
// }


var indexModel = {
  paging : function(req, res, next) {
    var pathname = url.parse(req.url).pathname.substring(1); //req는 웹의 requst요청에 대한 정보가지고있다
    res.render(pathname, { title: '1111' ,test:req.paramResult});
  }
}
// /* GET home page. */
// var memberList = {
//   //멤버리스트
//   memberList : function(req,res,next){
//       //var sql = 'SELECT * FROM BOARD_TBL WHERE B_CD = ?'; // 클럽목록
//       var sql = 'SELECT * FROM BOARD_TBL';
      
//       conn.query(sql,function(err, results, field){
//           //res.render('member/member_list', {data : 'testData list ejs', memberList : results});
//           //console.log("###########"+results);
//           req.paramResult=results;
//           next();
//       });
//   }
// };

module.exports = indexModel;
