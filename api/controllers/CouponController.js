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

  },

  find: function(req, res){
    user_id = req.param("user_id");
    var data = {
      limit: req.param("limit"),
      ending_before: req.param("ending_before"),
      starting_after: req.param("starting_after"),
      "include[]": "total_count"
    };
    stripe.coupons.list(data, function(err, stripe_coupons) {
      var coupon_ids = _.map(stripe_coupons.data, "id");
      Coupon.find({
        where : {user_id : user_id, coupon_id: coupon_ids}
      }).exec((err, db_coupons)=> {
        if (err) return res.json(200, {err: err});
        var db_coupon_ids = _.map(db_coupons, "coupon_id");
        var coupons = stripe_coupons.data.map(function(coupon){
          if(db_coupon_ids.indexOf(coupon.id)!==-1)
            coupon.can_delete = true;
          return coupon;
        });
        stripe_coupons.data = coupons;
        res.json(200, {coupons: coupons});
      });
    });
  }
};
