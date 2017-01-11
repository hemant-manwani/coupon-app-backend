/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


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
	}
};
