var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var applyRouter = require('./routes/apply');
var candidateRouter = require('./routes/candidate');
var companyRouter = require('./routes/company');
var employerRouter = require('./routes/employer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//템플릿에서 루트의 경로 설정 (현재폴더까지경로 +  /views)가 기본경로가 됨 //체크를 위해서적음
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//ejs 내부에서 정적경로 // root+pulic

app.get('/index',indexRouter);//app,router은 res.send() 한번만 사용가능  //router()는 method()를 다중 사용가능
app.get('/apply', applyRouter);
app.get('/candidate', candidateRouter);
app.get('/company', companyRouter);
app.get('/employer', employerRouter);

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
