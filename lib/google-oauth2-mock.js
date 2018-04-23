var passport = require('passport');
var util = require('util');

function GoogleOAuth2StrategyMock(options, verifyCallback) {
  this.name = 'googleOAuth2Mock';
  this.passAuthentication = options.passAuthentication || true;
  this.id = options.id || 1;
  this.displayName = options.displayName || "MOCK_DISPLAYNAME";
  this.familyName = options.familyName || "MOCK_FAMILYNAME";
  this.givenName = options.givenName || "MOCK_GIVENNAME";
  this.name = {
    familyName: this.familyName,
    givenName: this.givenName
  };
  this.value = options.value || "https://1.bp.blogspot.com/-Dsklbr0IWf8/WnuyHXAKhXI/AAAAAAABKAQ/yIcH39IH6WMJ0LGi18ywqyy3jyPLAJNbACLcBGAs/s400/internet_nidankai_ninsyou.png";
  this.photos = {
    value: this.value
  };
  this.verifyCallback = verifyCallback;
}

util.inherits(GoogleOAuth2StrategyMock, passport.Strategy);

GoogleOAuth2StrategyMock.prototype.authenticate = function authenticate(req) {
  if (this.passAuthentication) {
    var user = {
      id: this.id,
      displayName: this.displayName,
      name: {
        familyName: this.name.familyName,
        givenName: this.name.givenName
      },
      photos: [{
        value: this.photos.value
      }]
    };
    var self = this;
    this.verifyCallback(user, function(err, resident) {
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
