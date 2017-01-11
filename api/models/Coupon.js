/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var _ = require('lodash');

module.exports = {

	schema: true,

	attributes: {
	    id:{
	      type: 'string'
      },
			coupon_id: {
				type: 'string',
			},
	    duration: {
        type: 'string',
			},
      amount_off:{
        type: 'number'
      },
      currency:{
        type: 'string'
      },
      duration_in_months:{
        type: 'number'
      },
      max_redemptions:{
        type: 'number'
      },
      metadata: {
        type: 'object',
      },
			user_id: {
				type: 'string',
			},
      percent_off: {
        type: 'number'
      },
      redeem_by: {
        type: 'string'
      }
	},

	parseCoupon: function(coupon){
		var data = _.clone(coupon, true);
		var fields = ["amount_off", "duration_in_months", "max_redemptions", "percent_off"];
		for(var x = 0; x < fields.length; x++){
			if(coupon[fields[x]] != undefined)
				data[fields[x]] = parseInt(coupon[fields[x]]);
		}
		return data;
	}
};
