const postModel = require('../model/PostModel');

module.exports = {
  doPutPost: function (req, res, next) {
    postModel.putPost(req.body.data).then(function () {
      res.status(202).end()
    }).catch(function (err) {
      console.log('컨트롤러의 doPutPost에서 에러발생 ');
      next(err);
    });
  },
  doPutInsertComment: function (req, res, next) {
    postModel.putInsertComment(req.body).then(function () {
      res.status(202).end()
    }).catch(function (err) {
      console.log('컨트롤러의 doPutInsertComment에서 에러발생 ');
      next(err);
    });
  },
  doDeleteComment: function (req, res, next) {
    var param = req.body;
    postModel.checkCommentChild(param).then((result) => {
      //their is no child comment
      if (result[0].CNT == 1) {
        postModel.deleteComment(param).then(function () {
          res.status(202).end()
        }).catch(function (err) {
          next(err);//바로 app.js의 500번처리로 이동 (case1)
        })
      }else{
        //자식 코멘트가 존재할 경우
        throw new Error('[002]') // 이 경우 바로 app.js로 이동하는게 아니라 아래의 catch를 한번 거쳐서 app.js로 이동됨 (case2)
      }
    }).catch(function (err) {
      console.log('컨트롤러의 doDeleteComment에서 에러발생 ');
      next(err);//위의 [002]의 case2에서 넘어온다 (case2)
    });
  }
}