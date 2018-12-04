var passport = require('passport');
var util = require('util');

function GoogleOAuth2StrategyMock(options, verifyCallback) {
  this.passAuthentication = options.passAuthentication || true;
  this.id = options.id || 1;
  this.displayName = options.displayName || "MOCK_DISPLAYNAME";
  this.name = options.name||{
    familyName: "MOCK_FAMILYNAME",
    givenName: "MOCK_GIVENNAME"
  };
  this.emails = options.emails||[{
      value: 'googleOAuth2Mock@gmail.com',
      type: 'account'
  }];
  this.photos = options.photos||[{
    value: "https://1.bp.blogspot.com/-Dsklbr0IWf8/WnuyHXAKhXI/AAAAAAABKAQ/yIcH39IH6WMJ0LGi18ywqyy3jyPLAJNbACLcBGAs/s400/internet_nidankai_ninsyou.png"
  }];
  this.verifyCallback = verifyCallback;
}

util.inherits(GoogleOAuth2StrategyMock, passport.Strategy);

GoogleOAuth2StrategyMock.prototype.authenticate = function authenticate(req) {
  if (this.passAuthentication) {
    var profile = {
      id: this.id,
      displayName: this.displayName,
      name: this.name,
      emails: this.emails,
      photos: this.photos
    };
    var self = this;
    this.verifyCallback(null,null,profile, function(err, resident) {
      if (err) {
        self.fail(err);
      } else {
        self.success(resident);
      }
    });
  } else {
    this.fail('Unauthorized Error');
  }
}

module.exports = GoogleOAuth2StrategyMock;