# Passport-Mock-GoogleOAuth2

Passport-Mock-GoogleOAuth2 is a mock library to mocking Google OAuth2 authentication for Node.js.

## Install

```bash
$ npm install passport-mock-googleoauth2
```

## Usage

Load this mock lib in your app.js file like other strategies.

```js
var express = require('express');
var passport = require('passport');
var session = require('express-session');
var app = express();
var MockStrategy = require('passport-mock-googleoauth2');

app.use(session({
  secret: 'test'
}));

var options = {
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
var verifyCallback = (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}

passport.use('google-oauth', new MockStrategy(options, verifyCallback);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());
```

Write router like below.

```js
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
```

After accessing to `'/auth/google'`, you can correctly access to `'/secure'`.

## Examples

Examples are included in `/examples` dir.

## Related Modules

- [Passport](https://github.com/jaredhanson/passport)
- [Express-Session](https://github.com/expressjs/session)

## Tests

```bash
$ npm install
$ npm test
```

## Credits

- [osamtimizer](https://osamtimizer.hatenablog.com/)

## License

[MIT License](http://opensource.org/licenses/MIT)

Copyright(c) 2018 Osamtimizer
