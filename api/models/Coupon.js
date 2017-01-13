/**
 * Users.js
 *
 * @description :: Coupon schema and model functions.
 */
var _ = require('lodash');

module.exports = {
  schema: true,

  attributes: {
    id: {
      type: 'string'
    },
    coupon_id: {
      type: 'string'
    },
    user_id: {
      type: 'string'
    }
  },

  parseCoupon: function(coupon) {
    var data = _.clone(coupon, true);
    var fields = ["amount_off", "duration_in_months", "max_redemptions", "percent_off"];
    for (var x = 0; x < fields.length; x++) {
      if (coupon[fields[x]] != undefined) {
        data[fields[x]] = parseInt(coupon[fields[x]]);
      }
    }
    return data;
  }
};
