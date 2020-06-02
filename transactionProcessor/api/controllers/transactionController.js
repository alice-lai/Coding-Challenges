'use strict';

var mongoose = require('mongoose'),
  transaction = mongoose.model('Transaction');

exports.list_all_transactions = function(req, res) {
  transaction.find({}, function(err, transaction) {
    if (err){
      res.send(err);
    }
    res.json(transaction);
  });
};


exports.create_a_transaction = function(req, res) {
  //if array of JSON objects
	if (req.body.transactions){
		for (var transaction in req.body.transactions) {
  			transaction.save(function(err, transaction) {
  			if(err){		
		      res.send(transaction);
  			}
		    // If no errors are found, it responds with a JSON of the new user
		    else
		      res.json(req.body.transactions);
  			})
		}
	}
	// Single JSON Object
	else {
	  var new_transaction = new transaction(req.body);
	  // New transaction is saved in the db.
	  new_transaction.save(function(err){
	    if(err)
	      res.send(req.body);
	    // If no errors are found, it responds with a JSON of the new user
	    else
	      res.json(req.body);
	  });
	}
};
