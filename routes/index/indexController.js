var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path').path.replace(/\\/g,"/");
var indexModel = require(appRoot+"/model/index/indexModel");
var employerModel = require(appRoot+"/model/employer/employerModel");

router.get('/',employerModel);
router.get('/',indexModel);

//router.get('/', indexModel,employerModel);
//router.get('/',memberModel.memberList);
//console.log( path.join(__dirname, "index.html"));


module.exports = router;