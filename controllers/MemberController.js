const memberModel = require('../model/memberModel');

module.exports = {
  doPostIdCheck: function (req, res, next) {
    var id = req.body.id
    Promise.all([memberModel.postIdCheck(id)]).then((result) => {

      var loginChk = result[0][0].CNT; //첫번째 결과값[0]의 첫번째행[0]

      req.params.loginChk = loginChk;
      //console.log(req.params.jobList);

      next();
    });
  },
  doPostMailCheck: function (req, res, next) {
    var mail = req.body.mail
    Promise.all([memberModel.postMailCheck(mail)]).then((result) => {
      var loginChk = result[0][0].CNT; //첫번째 결과값[0]의 첫번째행[0]
      req.params.loginChk = loginChk;
      next();
    });
  },
  doPutCandidate: function (req, res, next) {
    memberModel.putCandidate(req.body.data).then(function (result) {
      //next('route');
      console.log('next("route")가 동작되지 않아서 여기서 res.send()처리');
      res.send('성공입니다~~')
      //next(resultChk);//putCandidate() 실행 후 아무 일 없을 시 다음 미들웨어로 넘김
    }).catch(function (err) {
      console.log('컨트롤러의 doPutCandidate에서 에러발생 ');
      next(err); //next(err) -->다음 미들웨어에 에러를 던지며 넘김
    });
  },
  doPutEmployer: function (req, res, next) {
    memberModel.putEmployer(req.body.data).then(function (result) {
      res.send('성공입니다~~')
    }).catch(function (err) {
      console.log('컨트롤러의 doPutEmployer 에러발생 ');
      next(err);
    });
  },
  doPostLogin: function (req, res, next) {
    memberModel.postLogin(req.body.data).then(function (result) {
      var chk=memberModel.putLoginLog(result);
      if(chk){
        req.params.result = result;
        next()
      }
    }).catch(function (err) {
      console.log(':::::doPutEmployer:::::--->'+err); // then error :  Error: Error in then()
      next(err)
    });
  }
}