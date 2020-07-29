const express = require('express');
const path = require('path');
const router = express.Router();
var appRoot = require('app-root-path').path.replace(/\\/g, "/");
const postModel = require('../model/postModel');
var url = require('url');

var multiparty = require('multiparty');
var fs = require('fs');

module.exports = {
  doInsertPostImage: function (req, res, next) {
    var form = new multiparty.Form(); //https://bcho.tistory.com/1078
    var rPath = url.parse(req.url, true).path;

    // get field name & value
    //field : 파일이 아닌 일반 필드가 들왔을때, 발생하는 이벤트
    form.on('field', function (name, value) {
      console.log('normal field / name = ' + name + ' , value = ' + value);
    });

    // file upload handling
    //HTML 파트가 들어왔을 때 발생하는 이벤트 -이미지파일이 part에 저장되어있음.
    form.on('part', function (part) {
      var filename;
      var size;
      var writeStream;
      var date = new Date();
      var addImageName = 'image_' + date.getHours() + date.getMinutes() + date.getSeconds() + '_';

      if (part.filename) {
        filename = part.filename;
        size = part.byteCount;
      } else {
        part.resume();
      }

      console.log("Write Streaming file :" + filename);

      //var writeStream = fs.createWriteStream(path.join(appRoot, '/public/uploads/')+filename);

      switch (rPath) {
        case "/new-post/imageUpload":
          writeStream = fs.createWriteStream(path.join(appRoot, '/public/uploads/post/') + addImageName + filename);
          break;
        case "/signup/candidate/imageUpload":
          writeStream = fs.createWriteStream(path.join(appRoot, '/public/uploads/candidate/') + addImageName + filename);
          break;
        case "/signup/employer/imageUpload":
          writeStream = fs.createWriteStream(path.join(appRoot, '/public/uploads/employer/') + addImageName + filename);
          break;
        case "/signup/company/imageUpload":
          writeStream = fs.createWriteStream(path.join(appRoot, '/public/uploads/company/') + addImageName + filename);
          break;
      }

      writeStream.filename = addImageName+filename;

      part.pipe(writeStream);

      part.on('data', function (chunk) {
        console.log(filename + ' read ' + chunk.length + 'bytes');
      });

      part.on('end', function () {
        console.log(filename + ' Part read complete');
        writeStream.end();

        //send Parameters..
        req.params.status = 1;
        req.params.url = writeStream.path;
        req.params.filename = writeStream.filename;
      });
    });

    // all uploads are completed
    // 폼 데이타가 모두 업로드 되었을때 발생하는 이벤트
    form.on('close', function () {
      next()
    });

    // track progress
    //폼 데이타를 업로드 하는 중간중간에 현재 진행 상태를 나타내가 위해서 발생되는 이벤트
    form.on('progress', function (byteRead, byteExpected) {
      console.log(' Reading total  ' + byteRead + '/' + byteExpected);
    });

    form.parse(req);
  }
}