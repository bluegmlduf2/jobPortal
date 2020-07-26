const memberModel = require('../model/memberModel');

module.exports = {
  doGetJobtype: function (req, res, next) {
    Promise.all([memberModel.getJobType()]).then((result) => {
        
      var jobType=result[0]; //JOB TYPE

      req.params.jobType=jobType;
      //console.log(req.params.jobList);
      
      next();
    });
  }
}