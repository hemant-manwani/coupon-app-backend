/**
 * AuthController
 *
 * @description :: Controller created to manage user login
 */

module.exports = {
  /**
  * @API CALL :: api/v1/auth/login
  *
  * @param{String} email
  * @param{String} password
  * return user details object along with token
  */
  login: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password){
      return res.json(401, {success: false, message: 'Email and password required'});
    }
    User.findOne({email: email}, function (error, user){
      if(!user){
        return res.json(401, {success: false, message: 'Invalid email or password'});
      }

      User.comparePassword(password, user, function (error, valid){
        if(error){
          return res.json(403, {success: false, message: 'Forbidden'});
        }
        if(!valid){
          return res.json(401, {success: false, message: 'Invalid email or password'});
        }else{
          res.json({
            success: true,
            user: user,
            token: jwToken.issue({id : user.id})
          });
        }
      });
    })
  }
};
