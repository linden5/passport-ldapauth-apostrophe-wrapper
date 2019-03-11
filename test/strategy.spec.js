// Before running the test case, an ldap mock server should start
var clone = require('lodash.clone');
var chai = require('chai');
var expect = require('chai').expect;
var chaiPassportStrategy = require('chai-passport-strategy');

var Strategy = require('../lib/strategy');

chai.use(chaiPassportStrategy);

describe('strategy test', function () {

  var username = 'user-login';
  var password = 'gfloan@customer';

  var strategyOptions = {
    server: {
      url: 'ldap://localhost:389',
      bindDN: 'cn=user,dc=test',
      bindCredentials: 'test',
      searchBase: 'dc=test',
      searchFilter: '(cn={{username}})'
    },
    completeProfile: function (user) {
      user.username = user.cn;
      user.displayName = user.cn;
      return user;
    }
  };

  function constructStrategyWithPassReqToCallback (passReqToCallback) {
    let options = clone(strategyOptions);
    options.server.passReqToCallback = passReqToCallback;

    return new Strategy(options, function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    });
  }

  function request (req) {
    req.body = {
      username: username,
      password: password
    };
  }

  function assertsProfile (profile) {
    expect(profile.username).to.equals(username);
    expect(profile.displayName).to.equals(username);
  }

  describe('with passReqToCallback set to false', function () {
    var strategy = constructStrategyWithPassReqToCallback(false);

    var profileWhenFalse;

    before(function (done) {

      chai.passport.use(strategy)
        .success(function (p) {
          profileWhenFalse = p;
          done();
        })
        .req(request)
        .authenticate();
    });

    it('profile has both username and displayName', function () {
      assertsProfile(profileWhenFalse);
    });
  });

  describe('with passReqToCallback set to true', function () {
    var strategy = constructStrategyWithPassReqToCallback(true);

    var profileWhenTrue;

    before(function (done) {

      chai.passport.use(strategy)
        .success(function (p) {
          profileWhenTrue = p;
          done();
        })
        .req(request)
        .authenticate();
    });

    it('profile has both username and displayName', function () {
      assertsProfile(profileWhenTrue);
    });
  });
});
