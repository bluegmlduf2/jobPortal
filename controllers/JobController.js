const express = require('express');
const jobModel = require('../model/JobModel');
const Views = '../views/'

module.exports = {
  doGetJobList: function (req, res, next) {
    var startCnt=1;
    var pageShow=8;
    jobModel.getJobList(startCnt,pageShow).then((result) => {
      //res.render(Views + 'index.ejs',{users: result});
      console.log(result);
      next();//여기서 next()를 사용해줘야지 다음 요청(컨트롤러)으로 넘어감.
      //router.get(1,2..)을 통해 요청이 들어옴. get(1,2) 내부의 함수가 요청에 따라 실행. 요청이 끝날 경우 next()사용
    });
  }
}