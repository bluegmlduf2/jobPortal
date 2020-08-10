var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var FileStore = require('session-file-store')(session); 
var logger = require('morgan');
const helmet= require('helmet');

var router = require('./routes/routes');

//Server
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //템플릿에서 루트의 경로 설정 (현재폴더까지경로 +  /views)가 기본경로가 됨
app.set('view engine', 'ejs');

//request가 올때마다 app.use() 안에 내용이 실행된다
app.use(helmet()) //보안을 위한 헬멧
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));//body-parser
app.use(cookieParser()); //app.use(미들웨어()) --> 미들웨어란? --> function(req,res,nex){next()}
app.use(session({
    secret: 'secretkey@#@',  // 암호화
    resave: false,
    saveUninitialized: true,
    key: 'Jobportal_Sid'
    //,store: new FileStore()//세션을 파일로 저장한다
}));
//미들웨어를 실행하는 이유는 request에 변형을 주기 위함이다
//app.use() -->get/post app.get() -->get app.post() -->post
// app.use(express.static(path.join(__dirname, 'public')));//ejs 내부에서 정적경로 // root+pulic
//app.use('/topic',function(req,res){console.log('aaa')}) /topic이라는 path가 서버에 접근할때 aaa를 찍는다
////app.use('/topic',function A) --> route.get('/getlist',function B) --> /topic/getlist 라는 url을 사용하게 됨

app.use('*/css', express.static(path.join(__dirname, 'public/css'))); //반환되는 url에서 */css로 끝나는 url 이있다면 public/css로 변경한다..?
app.use('*/js', express.static(path.join(__dirname, 'public/js'))); // */js에 해당되는 url을 public/js로 부분 교체
app.use('*/images', express.static(path.join(__dirname, 'public/images')));
// app.use('*/fonts', express.static(path.join(__dirname, 'public/fonts/ionicons/fonts')));
app.use('*/fonts/ionicons/fonts', express.static(path.join(__dirname, 'public/fonts/ionicons/fonts')));//ionicons.min.css안에서 해당 경로를 호출함
app.use('*/fonts/flaticon/font', express.static(path.join(__dirname, 'public/fonts/flaticon/font')));
app.use('*/uploads/post', express.static(path.join(__dirname, 'public/uploads/post'))); //image upload path
app.use('*/uploads/candidate', express.static(path.join(__dirname, 'public/uploads/candidate'))); //image upload path
app.use('*/uploads/employer', express.static(path.join(__dirname, 'public/uploads/employer'))); //image upload path
app.use('*/uploads/company', express.static(path.join(__dirname, 'public/uploads/company'))); //image upload path
app.use('*/uploads/job', express.static(path.join(__dirname, 'public/uploads/job'))); //image upload path
app.use('*/ckeditor', express.static(path.join(__dirname, 'public/ckeditor')));
app.use('*/javascript', express.static(path.join(__dirname, 'views/javascript')));

app.use(router); //app,router은 res.send() 한번만 사용가능  //router()는 method()를 다중 사용가능

//ERROR HANDELING 404
app.use(function (req, res, next) {
    console.log('::::::::::::::::::::::::: ErrorHandler(400) :::::::::::::::::::::::::')
    res.status(404).send('Sorry cant find that!');
});

//ERROR HANDELING //next(err)호출된 경우에 function(err,req,res,next)의 인자가 4개인 미들웨어가 바로 호출됨
app.use(function (err,req, res, next) {
    console.log('::::::::::::::::::::::::: ErrorHandler(500) :::::::::::::::::::::::::')
    console.log(err);

    if(typeof err=='string'){
        //NO USER
        if(err.substr(0,5)=='[001]'){
            res.status(500).send({error:'Their is NO USER. Please Check'})
        }
    }else{
        console.log(err.stack)
        res.status(500).send({error:'Please Contact Administrator.'})//최종적으로 500상태코드의 res를 던지며 종료
    }
});

module.exports = app;