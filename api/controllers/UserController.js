/**
 * UserController
 *
 * @description :: Controller to register user in application and privide the
 * user details
 *
 */
var _ = require('lodash');
module.exports = {
  /**
  * @API CALL :: api/v1/user
  *
  * @param{String} email
  * @param{String} password
  * @param{String} confirm_password
  * return {Object}user details
  */
  create: function (req, res) {
    if(req.body.password !== req.body.confirm_password){
      return res.json(401, {success: false, message: "password does not matches"});
    }
    var data = {
      email: req.body.email,
      password: req.body.password
    };
    User.create(data).exec(function (err, user) {
      if(err){
        return res.json(err.status, {success: false, message: "Unable to create user"});
      }
      if(user){
        res.json(200, {success: true, user: user, token: jwToken.issue({id: user.id})});
      }
    });
  },

  /**
  * @API CALL :: api/v1/user/me
  * Method to provide user profile data
  */
  me: function(req, res){
    User.findOne({
     where : {id : req.user_id}
    }).exec((err, user)=> {
      if(err){
        return res.json(404, {success: false, message: "User details not found"});
      }
      return res.json(200, {success: true, user: user});
    });
  }
};
