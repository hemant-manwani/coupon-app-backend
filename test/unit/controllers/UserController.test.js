var request = require('supertest');

describe('User Controller', function() {
  describe('Create a new user', function() {

    it('User should be created when paswords get matched', function (done) {
      var user = {"email": "test@gmail.com", "password": "dilip", "confirm_password": "dilip"};
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/user')
        .send(user)
        .expect(200, done);
    });

    it('User should not be created when paswords does not get matched', function (done) {
      var user = {"email": "test@gmail.com", "password": "dilip", "confirm_password": "dilip2"};
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/user')
        .send(user)
        .expect(401, done);
    });
  });
});
