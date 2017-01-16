/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 */

var
  jwt = require('jsonwebtoken'),
  tokenSecret = "secretissecet";

module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    tokenSecret,
    {
      expiresIn : 172800
    }
  );
};
module.exports.verify = function(token, callback) {
  return jwt.verify(
    token,
    tokenSecret,
    {},
    callback
  );
};
