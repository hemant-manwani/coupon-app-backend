/**
 * UserController
 *
 * @description :: Server-side logic for managing user
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
      return res.json(401, {err: 'password does not matches'});
    }
    User.create(req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      if (user) {
        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
      }
    });
  },

  me: function(req, res){
    if(typeof(req.user_id) == "undefined"){
      return res.json(404, {err: "user id not available"});
    }
    User.findOne({
     where : {id : req.user_id}
    }).exec((err,user)=> {
      if(err){
        return res.json(404, {err: "user not found"});
      }
      return res.json(200, {user: user});
    });
  }
};
