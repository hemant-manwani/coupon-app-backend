describe('Coupon model functions', function() {
  describe('Parse coupon', function() {
    it ('string fields (amount_off, duration_in_months, max_redemptions, percent_off) should get converted to integers', function(done) {
      var coupon = {
        "user_id" : "1",
        "coupon_id" : "75OFF",
        "amount_off": "2500",
        "currency": "usd",
        "duration": "once",
        "percent_off": "5",
        "duration_in_months": "4",
        "max_redemptions": "1"
      };
      var parsedCoupon = Coupon.parseCoupon(coupon);
      (typeof(parsedCoupon.amount_off)).should.be.eql("number");
      (typeof(parsedCoupon.percent_off)).should.be.eql("number");
      (typeof(parsedCoupon.duration_in_months)).should.be.eql("number");
      (typeof(parsedCoupon.max_redemptions)).should.be.eql("number");
      done();
    });
  });
});
