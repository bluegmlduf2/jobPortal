const express = require('express');
const url = require('url');
//const Users = require('../models/Users');
const Views = '../views/'

module.exports = {
  doIndexPage: function (req, res, next) {
    var pathname = url.parse(req.url).pathname.substring(1); //req는 웹의 requst요청에 대한 정보가지고있다
    console.log("pathname::"+pathname);
    res.render(pathname, { title: '1111' ,test:'22222222'});
  }
}