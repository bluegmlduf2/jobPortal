const url = require('url');

module.exports = {
  doIndexPage: function (req, res, next) {
    var pathname =url.parse(req.url).pathname;
        console.log(pathname)
    var idxStr=pathname.substring(pathname.indexOf('/')+1);
        console.log(idxStr)
    pathname =(idxStr.substring(0,idxStr.indexOf('/'))); //req는 웹의 requst요청에 대한 정보가지고있다
    console.log("pathname::::::::"+pathname);
    //console.log("test::::::::::::::::::"+req.paramResult);
        // req.paramResult.jobList=result[0];
    // req.paramResult.jobCnt=result[1];
    //parse -->JSON형태의 문자열을 JSON객체로 만듬
    // stringify -->일반객체를 JSON형태의 문자열로 만듬
    res.render(pathname, { title: '1111' ,test:JSON.parse(JSON.stringify(req.params))});

  }
}