/**
 * CouponsController
 *
 * @description :: Server-side logic for managing coupons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');
const stripe = require("stripe")(
  process.env.STRIPE_API_KEY
);

module.exports = {
	list: function (req, res) {	
	stripe.coupons.list(
	  { limit: 3 },
	  function(err, coupons) {
	  	const selections = _.mapValues(
        _.pickBy(coupons.data, _.isObject),
	        (val, key) => {
	            return _.assign(
	                {},
	                {userid:0},
	                _.pick(val, [ 'id', 'amount_off', 'percent_off', 'times_redeemed', 'created', 'duration'])
	            );
	        }
	    );

	  	

	  	console.log('List of all coupons', selections);
	  	/*{ id: 'A123456',
       object: 'coupon',
       amount_off: null,
       created: 1484047106,
       currency: null,
       duration: 'forever',
       duration_in_months: null,
       livemode: false,
       max_redemptions: 2,
       metadata: {},
       percent_off: 10,
       redeem_by: 1484850599,
       times_redeemed: 0,
       valid: true }*/

	  }
	);
	}
};

