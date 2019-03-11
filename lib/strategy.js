var util = require('util');

var LdapAuthStrategy = require('passport-ldapauth');

/**
 * `Strategy` constructor.
 * 
 * This is a wrapper strategy that adapts passport-ldapauth to apostrophe-passport
 * Documents can be found at [passport-ldapauth](https://github.com/vesse/passport-ldapauth)
 * This stategy adds an extra option `completeProfile` that accepts a function to complete user profile
 * 
 * 
 * @constructor
 * @param {object} options -
 * @param {function} options.completeProfile -
 * @param {function} verify
 * @access public 
 */
function Strategy (options, verify) {
  if (!options.completeProfile) {
    options.completeProfile = function (user) {
      return user;
    };
  }

  var _verify = function (req, user, done) {
    var profile = options.completeProfile(user);

    return verify('', '', profile, done);
  };

  if (!options.passReqToCallback) {
    _verify = _verify.bind(null, null);
  }

  LdapAuthStrategy.call(this, options, _verify);
}

util.inherits(Strategy, LdapAuthStrategy);


module.exports = Strategy;
