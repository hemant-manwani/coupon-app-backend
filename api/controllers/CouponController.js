/**
 * CouponsController
 *
 * @description :: Server-side logic for managing coupons
 * This Controller fetch the coupons from the api and provide list to requested user
 */

var _ = require('lodash');
const stripe = require("stripe")(sails.config.stripe.secret_key);

module.exports = {

  /** 
  * API to create new coupon in db and on stripe account as well
  *
  */
  create: function(req, res){
    var coupon_data = Coupon.parseCoupon(req.body);

    var user_id = req.user_id;

    // Call stripe action to create coupon on stripe
    stripe.coupons.create(coupon_data, function(stripe_err, stripe_coupon) {
      if(stripe_err){
        return res.json(200, {err: {"message": "Unable to create coupon on stripe"}});
      }
      new_coupon = {user_id: user_id, coupon_id: stripe_coupon.id}

      Coupon.create(new_coupon).exec(function (err, coupon) {
        if(err){
          return res.json(200, {err: {"message":"Unable to create coupon"}});
        }
        if(coupon){
          res.json(200, {coupon: stripe_coupon});
        }
      });
    });

  },

  /** 
  * API to fetch all the coupons list 
  * Coupons list is created using stripe coupons and existing db coupons
  *
  */
  find: function(req, res){
    var user_id = req.user_id;

    var data = {
      limit: req.param("limit"),
      ending_before: req.param("ending_before"),
      starting_after: req.param("starting_after"),
      "include[]": "total_count"
    };

    // Call stripe action to get the list of coupons
    stripe.coupons.list(data, function(err, stripe_coupons) {
      var coupon_ids = _.map(stripe_coupons.data, "id");
      Coupon.find({
        where : {user_id : user_id, coupon_id: coupon_ids}
      }).exec((err, db_coupons)=> {
        if (err){
          return res.json(200, {err: {"message": "Unable to find coupons for the logged in user"}});
        }
        var db_coupon_ids = _.map(db_coupons, "coupon_id");
        var coupons = stripe_coupons.data || [];
        coupons = coupons.map(function(coupon){
          if(db_coupon_ids.indexOf(coupon.id)!==-1)
            coupon.user_id = user_id;
          return coupon;
        });
        stripe_coupons.data = coupons;
        res.json(200, {coupons: coupons});
      });
    });
  },

  /** 
  * API to remove the delete the coupon from db and stripe
  *
  * Coupons can be deleted only by those users who have created the coupon
  */
  destroy: function(req, res){
    Coupon.findOne({
      where : {user_id : req.user_id, coupon_id: req.param("id")}
    }).exec((err, db_coupon)=> {
      if(err){
        res.json(200, {err: {"message": "Coupon with id " + req.param("id") + "was not found"}});
      }else if(db_coupon != null){
        stripe.coupons.del(req.param("id"))
        .then(function(data){
          Coupon.destroy({coupon_id: req.param("id")}).exec((err, data)=>{
            if(err){
              return res.json(200, {err: {"message": "Unable to delete coupon"}});
            }
            res.json(200, {message: "Coupon deleted successfuly"});
          });
        })
        .catch(function(err){
          if(err){
            return res.json(200, {err: {"message": "Unable to delete coupon on stripe"}});
          }
        })
      }else{
        res.json(200, {err: {message: "You are not authorized to delete this coupon"}});
      }
    });
  }
};
