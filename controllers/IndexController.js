const express = require('express');
const url = require('url');
//const Users = require('../models/Users');
const Views = '../views/'

module.exports = {
  doIndexPage: function (req, res, next) {
    var pathname = url.parse(req.url).pathname.substring(1); //req는 웹의 requst요청에 대한 정보가지고있다
    console.log("pathname::::::::"+pathname);
    //console.log("test::::::::::::::::::"+req.paramResult);
        // req.paramResult.jobList=result[0];
    // req.paramResult.jobCnt=result[1];
    //parse -->JSON형태의 문자열을 JSON객체로 만듬
    // stringify -->일반객체를 JSON형태의 문자열로 만듬
    res.render(pathname, { title: '1111' ,test:JSON.parse(JSON.stringify(req.params))});

  }
}