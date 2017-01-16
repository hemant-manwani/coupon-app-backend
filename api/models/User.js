/**
 * Users.js
 *
 * @description :: User schema and model functions..
 */

var bcrypt = require('bcrypt-nodejs');
module.exports = {

  schema: true,

  attributes: {
    email: {
      type: 'email',
      required: 'true',
      unique: true
    },
    encrypted_password: {
      type: 'string'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.encrypted_password;
      return obj;
    }
  },

  comparePassword : function (password, user, callback) {
    bcrypt.compare(password, user.encrypted_password, function (err, match) {
      if(err){
        callback(err);
      }
      if(match){
        callback(null, true);
      } else {
        callback(err);
      }
    });
  }
};
