/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// We don't want to store password with out encryption
var bcrypt = require('bcrypt');
module.exports = {
  
	schema: true,
	  
	attributes: {
	    userid:{
	        model: 'user'
	    },
	    id:{
	        type: 'string'
	    },
	    amount_off:{
	        type: 'string'
	    },
	    percent_off:{
	        type: 'string'
	    },
	    times_redeemed:{
	        type: 'date'
	    },
	    created:{
	        type: 'text'
	    },
	    duration:{
	        type: 'text'
	    }
	}  
};