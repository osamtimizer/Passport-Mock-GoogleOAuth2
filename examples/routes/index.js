var express = require('express');
var router = express.Router();
var passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else {
    res.redirect('unsecure');
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/google', passport.authenticate('google-oauth', {
  scope: 'https://www.googleapis.com/auth/plus.login',
  successRedirect: '/auth/google/callback',
  failureRedirect: '/',
}));

router.get('/auth/google/callback', passport.authenticate('google-oauth', {
  successRedirect: '/secure'
}));

router.get('/secure', isAuthenticated, (req, res, next) => {
  res.render('mypage', {
    displayName: req.session.passport.user.displayName,
    photos: req.session.passport.user.photos[0].value
  });
});

router.get('/unsecure', (req, res, next) => {
  res.render('unsecure');
});

module.exports = router;
