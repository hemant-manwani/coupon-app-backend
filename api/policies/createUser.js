/**
 * createUser
 *
 * @module      :: Policy
 * @description :: Simple policy to create user
 *
 *
 */
var bcrypt = require('bcrypt-nodejs');
module.exports = function(req, res, next) {
  var values = {
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirm_password
  };
  bcrypt.genSalt(10, function (err, salt) {
    if(err){
      return next(err);
    }
    bcrypt.hash(values.password, salt, null, function (err, hash) {
      if(err){
        return next(err);
      }
      values.encrypted_password = hash;
      req.body = values;
      next();
    })
  })
};
