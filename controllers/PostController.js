const postModel = require('../model/PostModel');

module.exports = {
  doPutPost: function (req, res, next) {
    postModel.putPost(req.body.data).then(function () {
      res.status(202).end()
    }).catch(function (err) {
      console.log('컨트롤러의 doPutPost에서 에러발생 ');
      next(err);
    });
  }

}