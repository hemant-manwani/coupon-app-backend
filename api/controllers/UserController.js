/**
 * UserController
 *
 * @description :: Server-side logic for managing user
 * @API CALL        :: api/v1/user
 * @parma{String} email 
 * @parma{String} password 
 * @parma{String} confirm_password
 * 
 */
var _ = require('lodash');
module.exports = {
  create: function (req, res) {
    if(req.body.password !== req.body.confirm_password){
      return res.json(401, {err: 'password does not matches'});
    }
    var data = {
      email: req.body.email,
      password: req.body.password
    };
    User.create(data).exec(function (err, user) {
      if(err){
        return res.json(err.status, {err: {"message": "unable to create user"}});
      }
      if(user){
        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
      }
    });
  },

  me: function(req, res){
    User.findOne({
     where : {id : req.user_id}
    }).exec((err, user)=> {
      if(err){
        return res.json(404, {err: "user not found"});
      }
      return res.json(200, {user: user});
    });
  }
};
