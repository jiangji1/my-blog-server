var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer  = require('multer')
var dbFn = require('./api/db')
global.dbFn = dbFn
// var upload = multer({ dest: '/uploads/' })
// var formidable = require('./node_modules/formidable')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, '/static')));

global.token = {
  '49afcc8f7496336b1d2d18ee327e46f7': true
}

app.all('*', function (req, res, next) {
  // res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  // res.header("X-Powered-By", ' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,token');
  next()
})

const routerPath = [
  '/api/list',
  '/api/login',
  '/api/editSave',
  '/api/detail',
  '/api/del',
]

routerPath.forEach(v => {
  app.use(v, require('.' + v))
})

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
