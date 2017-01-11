/**
 * CouponsController
 *
 * @description :: Server-side logic for managing coupons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
const stripe = require("stripe")(sails.config.stripe.secret_key);

module.exports = {

  create: function(req, res){
    var coupon_data = Coupon.parseCoupon(req.body), user_id;
    if(!(user_id = coupon_data.user_id))
      return res.json(200, {err: "please send customer_id in coupon metadata"});
    delete coupon_data.user_id;

    stripe.coupons.create(coupon_data, function(stripe_err, stripe_coupon) {
      if(stripe_err) return res.json(200, {err: stripe_err});
      new_coupon = {user_id: user_id, coupon_id: stripe_coupon.id}

      Coupon.create(new_coupon).exec(function (err, coupon) {
        if (err) return res.json(200, {err: err});
        if (coupon) res.json(200, {coupon: coupon});
      });
    });

  }
};
