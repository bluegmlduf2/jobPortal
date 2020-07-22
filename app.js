var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = require('./routes/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//템플릿에서 루트의 경로 설정 (현재폴더까지경로 +  /views)가 기본경로가 됨
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));//ejs 내부에서 정적경로 // root+pulic

app.use('*/css',express.static(path.join(__dirname, 'public/css')));//반환되는 url에서 */css로 끝나는 url 이있다면 public/css로 변경한다..?
app.use('*/js',express.static(path.join(__dirname, 'public/js'))); // */js에 해당되는 url을 public/js로 부분 교체
app.use('*/images',express.static(path.join(__dirname, 'public/images')));
app.use('*/fonts',express.static(path.join(__dirname, 'public/fonts')));
app.use('*/ckeditor',express.static(path.join(__dirname, 'public/ckeditor')));
app.use('*/javascript',express.static(path.join(__dirname, 'views/javascript')));


const multer = require('multer');
// 기타 express 코드 /new-post/upload
const upload = multer({ dest: 'new-post/upload', limits: { fileSize: 5 * 1024 * 1024 } });
app.use('new-post/upload', upload.single('jpg'), (req, res) => {
  console.log("$$$$$$$$$$$$$$$$$$");
  console.log(req.file); 
});


//<link rel="stylesheet" href="/css/flaticon.css"></link>를 localhost/job/로 호출하면 localhost/job/css/flaticon.css가 되고 이를 변경하면 c:\..public/css/flaticon.css

app.use(router);//app,router은 res.send() 한번만 사용가능  //router()는 method()를 다중 사용가능

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
