const memberModel = require('../model/memberModel');

module.exports = {
  doPostIdCheck: function (req, res, next) {
    var id=req.body.id
    Promise.all([memberModel.postIdCheck(id)]).then((result) => {
        
      var loginChk=result[0][0].CNT; //첫번째 결과값[0]의 첫번째행[0]
      
      req.params.loginChk=loginChk;
      //console.log(req.params.jobList);
      
      next();
    });
  },
  doPostMailCheck: function (req, res, next) {
    var mail=req.body.mail
    Promise.all([memberModel.postMailCheck(mail)]).then((result) => {
      var loginChk=result[0][0].CNT; //첫번째 결과값[0]의 첫번째행[0]
      req.params.loginChk=loginChk;      
      next();
    });
  },
  doPutCandidate: function (req, res, next) {
    memberModel.putCandidate(req.body.data);
    // Promise.all([
    //   memberModel.putCandidate(req.body.data)
    //   // ,memberModel.putCandidateDetail(req.body)
    //   // ,memberModel.putLogin(req.body)
    // ]).then((result) => {
    //   console.log(result);
    //   // var loginChk=result[0][0].CNT; //첫번째 결과값[0]의 첫번째행[0]
    //   // req.params.loginChk=loginChk;      
    //   next();
    // });
    // // Promise.all([memberModel.postMailCheck(data)]).then((result) => {
    // //   // var loginChk=result[0][0].CNT; //첫번째 결과값[0]의 첫번째행[0]
    // //   // req.params.loginChk=loginChk;      
    // //   next();
    // // });
    next();
  }
  
}