const express = require('express');
const path = require('path');
const router = express.Router();

const jobModel = require('../model/JobModel');


module.exports = {
  doInsertPostImage: function (req, res, next) {
    console.log("########################111111111111");
    //console.log(req);
    console.log(req.file);
      var dest, fileName, fs, l, tmpPath;
      
      fs = require('fs');
      
      tmpPath = req.files.upload.path;
      console.log("########################2222222222222");
      console.log(tmpPath);
      l = tmpPath.split('/').length;
      fileName = tmpPath.split('/')[l - 1] + "_" + req.files.upload.name;
      
      dest = __dirname + "/public/uploads/" + fileName;
      fs.readFile(req.files.upload.path, function(err, data) {
        if (err) {
          console.log(err);
          return;
        }
        
        fs.writeFile(dest, data, function(err) {
          var html;
          if (err) {
            console.log(err);
            return;
          }
          
          html = "";
          html += "<script type='text/javascript'>";
          html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
          html += "    var url     = \"/uploads/" + fileName + "\";";
          html += "    var message = \"Uploaded file successfully\";";
          html += "";
          html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
          html += "</script>";
          
          next()
          //res.send(html);
        });
      })
  },
  doGetJobSingleList: function (req, res, next) {
    var jobNum = req.params.jobNum; //job_idx

    Promise.all([jobModel.getJobSingleList(jobNum), jobModel.getJobCommentList(jobNum)]).then((result) => {
      req.params.jobSingleList = result[0];
      req.params.jobCommentList = result[1];
      next();
    });
  }
}