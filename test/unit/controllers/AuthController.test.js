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

    it('User should not be logged in with wrong password and right email', function (done) {

      var user = {"email": "dilipchouhan153@gmail.com", "password": "dilip2"};

      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/auth/login')
        .send(user)
        .expect(401, done);
    });

    it('User should not be logged in with right password and wrong email', function (done) {

      var user = {"email": "dilipchouhan@gmail.com", "password": "dilip"};

      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/auth/login')
        .send(user)
        .expect(401, done);
    });

    it('User should not be logged in with wrong password and wrong email', function (done) {
      var user = {"email": "dilipchouhan@gmail.com", "password": "dilip2"};
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/auth/login')
        .send(user)
        .expect(401, done);
    });
  });
});
