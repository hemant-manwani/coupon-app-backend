/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');
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

  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err){
        return next(err);
      }
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err){
          return next(err);
        }
        values.encrypted_password = hash;
        next();
      })
    })
  },

  comparePassword : function (password, user, callback) {
    bcrypt.compare(password, user.encrypted_password, function (err, match) {
      if(err){
        callback(err);
      }
      if(match){
      	console.log('fields are matched');
        callback(null, true);
      } else {
        callback(err);
      }
    })
  }
};
