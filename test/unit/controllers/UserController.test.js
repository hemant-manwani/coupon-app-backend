var request = require('supertest');

describe('User Controller', function() {

  var user1 = {"email": "test@gmail.com", "password": "dilip", "confirm_password": "dilip"};
  var user2 = {"email": "test@gmail.com", "password": "dilip", "confirm_password": "dilip2"};
  var user = {"email": "dilipchouhan153@gmail.com", "password": "dilip"};
  var token;

  describe('Create a new user', function() {

    it('User should be created when paswords get matched', function (done) {
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/user')
        .send(user1)
        .expect(200, done);
    });

    it('User should not be created when paswords does not get matched', function (done) {
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/user')
        .send(user2)
        .expect(401, done);
    });
  });

  describe("Get user details", function() {
    it('User should able to get his data on request', function (done) {
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/auth/login')
        .send(user)
        .end(function(error, response){
          token = response.body.token;
          request(sails.getBaseUrl() + sails.config.blueprints.prefix)
            .get('/user/me')
            .set('authorization', "Bearer " + token)
            .expect(200, done);
        });
    });
  });
});
