'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commands = ["DEPOSIT", "WITHDRAW", "XFER", "FREEZE", "THAW"];
var transferCommand = ["XFER"];
var amountCommands = ["DEPOSIT", "WITHDRAW", "XFER"];
var accountIDCommands = ["DEPOSIT", "WITHDRAW", "FREEZE", "THAW"];

var TransactionSchema = new Schema({
  cmd: {
    type: String,
    enum: commands,
    uppercase: true,
    required: true
  },
  accountId: {
    type: String,
    required: needsAccountId
  },
  fromId: {
    type: String,
    required: isTransfer
  },
  toId: {
    type: String,
    required: isTransfer
  },
  amount: {
    type: Number, 
    get: getAmount, 
    set: setAmount,
    required: needsAmount
  }
});

function getAmount(num){
    return (num/100).toFixed(2);
}

function setAmount(num){
    return num*100;
}

function isTransfer(){
    if(transferCommand.indexOf(this.cmd) > -1){  
        return true;
    }
    return false;
}

function needsAmount(){
    if(amountCommands.indexOf(this.cmd) > -1){  
        return true;
    }
    return false;
}

function needsAccountId(){
    if(accountIDCommands.indexOf(this.cmd) > -1){ 
        return true;
    }
    return false;
}

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = {Transaction};
