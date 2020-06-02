'use strict';
module.exports = function(app) {
  var transactions = require('../controllers/transactionController');

  app.route('/transaction')
  	.post(transactions.create_a_transaction);

 };