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
  }
};
