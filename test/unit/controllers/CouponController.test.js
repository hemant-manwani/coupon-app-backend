var request = require('supertest');

describe('Coupon Controller', function() {

  var user = {"email": "dilipchouhan153@gmail.com", "password": "dilip"};
  var token;
  var coupon_id = (0|Math.random()*9e6).toString(36);
  var coupon = {"id": coupon_id , "duration": "once", amount_off: "2000", "currency": "usd"}
  describe("Get coupons", function() {
    it('User should able to get coupons on get request', function (done) {
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/auth/login')
        .send(user)
        .end(function(error, response){
          token = response.body.token;
          request(sails.getBaseUrl() + sails.config.blueprints.prefix)
            .get('/coupon')
            .set('authorization', "Bearer " + token)
            .expect(function(res){
              res.body.should.have.property('coupons');
            }).end(done);
        });
    });
  });

  describe("Create new coupon", function() {
    it('User should able to create new coupon on post request', function (done) {
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/auth/login')
        .send(user)
        .end(function(error, response){
          token = response.body.token;
          request(sails.getBaseUrl() + sails.config.blueprints.prefix)
            .post('/coupon')
            .set('authorization', "Bearer " + token)
            .send(coupon)
            .expect(function(res){
              res.body.coupon.id.should.be.eql(coupon_id);
            }).end(done);
        });
    });
  });

  describe("Delete coupon", function() {
    it('User should able be able to delete existing coupon', function (done) {
      request(sails.getBaseUrl() + sails.config.blueprints.prefix)
        .post('/auth/login')
        .send(user)
        .end(function(error, response){
          token = response.body.token;
          request(sails.getBaseUrl() + sails.config.blueprints.prefix)
            .delete('/coupon/'+ coupon_id)
            .set('authorization', "Bearer " + token)
            .expect(function(res){
              res.body.success.should.be.eql(true);
            }).end(done);
        });
    });
  });

});
