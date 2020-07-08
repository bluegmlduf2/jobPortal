var express = require('express');
var path=require('path');
var appRoot = require('app-root-path').path.replace(/\\/g,"/");
var indexModel = require(appRoot+"/model/index/indexModel");
var router = express.Router();

router.get('/', indexModel);
//router.get('/',memberModel.memberList);
//console.log( path.join(__dirname, "index.html"));


module.exports = router;