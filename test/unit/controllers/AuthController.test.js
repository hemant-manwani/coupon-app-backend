var request = require('supertest');

describe('Auth Controller', function() {
  describe('User login', function() {

    it('User should be logged in with correct credentials', function (done) {
      var user = {"email": "dilipchouhan153@gmail.com", "password": "dilip"};
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/auth/login')
        .send(user)
        .expect(200, done);
    });

    // it('User should not be created when paswords does not get matched', function (done) {
    //   var user = {"email": "test@gmail.com", "password": "dilip", "confirm_password": "dilip2"};
    //   request(sails.getBaseUrl() + sails.config.blueprints.prefix)
    //     .post('/user')
    //     .send(user)
    //     .expect(401, done);
    // });
  });
});
