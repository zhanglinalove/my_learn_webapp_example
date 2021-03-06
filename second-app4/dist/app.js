'use strict';

require('./models/init');

var bcrypt = require('bcrypt');
var UserModel = require('./models/user');
var config = require('./config');
var auth = require('./middlewares/auth');
var connectMongodb = require('connect-mongo');
var session = require('express-session');
var MongoStore = new connectMongodb(session);

var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var useragent = require('express-useragent');
//var ipfilter = require('express-ipfilter').IpFilter;


var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes/router.api');
var page = require('./routes/router.page');

var app = express();
//var ips = ['127.0.0.1'];


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
//app.use(ipfilter(ips));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());
app.use(cookieParser(config.cookieName));
app.use(session({
  secret: config.sessionSecret,
  store: new MongoStore({
    url: config.mongodbUrl
  }),
  resave: true,
  saveUninitialized: true
}));
app.use(auth.authUser);

// Create the server
/*
app.use( function( req ,res ,next){
  console.log(req.useragent);

});
*/

app.use('/', page);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message || err;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // the error response
  res.status(err.status || 500);
  res.format({
    json: function json() {
      res.send({ error: err.toString() });
    },
    html: function html() {
      res.render('error');
    },
    default: function _default() {
      var message = '' + errorDetails;
      res.send('500 Internal server error:\n' + err.toString());
    }
  });
});

module.exports = app;
//# sourceMappingURL=app.js.map