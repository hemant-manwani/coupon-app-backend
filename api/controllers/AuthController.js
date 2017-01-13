/**
 * AuthController
 *
 * @description :: Controller created to manage user login 
 */

module.exports = {
  /**
  * @API CALL :: api/v1/auth/login
  *
  * @parma{String} email 
  * @parma{String} password 
  * return user details object along with token
  */
  login: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password){
      return res.json(401, {err: 'Email and password required'});
    }

    User.findOne({email: email}, function (err, user) {
      if (!user){
        return res.json(401, {err: 'Invalid email or password'});
      }

      User.comparePassword(password, user, function (err, valid) {
        if(err){
          return res.json(403, {err: 'Forbidden'});
        }
        if(!valid) {
          return res.json(401, {err: 'Invalid email or password'});
        }else{
          res.json({
            user: user,
            token: jwToken.issue({id : user.id })
          });
        }
      });
    })
  }
};
