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
      console.log('#########################################');
      console.log(result);
      console.log(result[0].CNT);

      if (result[0].CNT == 1) {
        postModel.deleteComment(param).then(function () {
          res.status(202).end()
        }).catch(function (err) {
          throw new Error(err)
        })
      }else{
        throw new Error('[002]')
      }
    }).catch(function (err) {
      console.log('컨트롤러의 doDeleteComment에서 에러발생 ');
      next(err);
    });
  }
}