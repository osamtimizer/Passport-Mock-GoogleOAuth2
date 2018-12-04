var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleStrategyMock = require('../lib/google-oauth2-mock');

//TODO:If you want to use your own Google OAuth2 API,
//download and set authentication json file and put it on the appropriate path.
//
//var google_auth = require('./config/google-auth.json');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'test'
}));

let AppropriateStrategy;
let options;
let verifyCallback;

if (process.env.NODE_ENV === 'PRODUCTION') {
  AppropriateStrategy = GoogleStrategy;
  options = {
    clientID: google_auth.web.client_id,
    clientSecret: google_auth.web.client_secret,
    callbackURL: '/auth/google/callback'
  };
} else {
  AppropriateStrategy = GoogleStrategyMock;
  options = {
    id:'111100000000000000011',
    displayName: 'MOCK_DISPLAYNAME',
    name:{
      familyName: 'MOCK_FAMILYNAME',
      givenName: 'MOCK_GIVENNAME'
    },
    emails:[{
      value: 'googleOAuth2Mock@gmail.com',
      type: 'account'
    }],
    photos:[{
      value: 'https://1.bp.blogspot.com/-Dsklbr0IWf8/WnuyHXAKhXI/AAAAAAABKAQ/yIcH39IH6WMJ0LGi18ywqyy3jyPLAJNbACLcBGAs/s400/internet_nidankai_ninsyou.png'
    }],
    passAuthentication: true
  };
}

verifyCallback = (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

passport.use('google-oauth', new AppropriateStrategy(options, verifyCallback));


passport.serializeUser((user, done) => {
  console.log("serializeUser");
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("deserializeUser");
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

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
