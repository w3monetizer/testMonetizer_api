const sha256 = require('sha256');

function Blockchain(repo) {
  this.chain = [];  // to store  all blocks / validated tx/contrib
  this.pendingTransactions = [];  // to store new contributions/tx before being tested/mined
}


Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce, // Proof of work - a number - proof that we created the block in a legitimate way
    hash: hash, // data from our new block - all new tx compressed in a single string
    previousBlockHash: previousBlockHash  // the data hashed of the previous block
  };

  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
}


Blockchain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
}


Blockchain.prototype.createNewTransaction = function (amount, sender, recipient, commit, senderRepo, recipientRepo, recipientBranch) {
  const newTransaction = { // pending Transactions
    amount: amount,
    sender: sender,
    recipient: recipient,
    commit,
    senderRepo,
    recipientRepo,
    recipientBranch
  } // commit, senderRepo, recipientRepo, recipientBranch required for coMonetizer

  this.pendingTransactions.push(newTransaction);

  return this.getLastBlock()['index'] + 1;
}


Blockchain.prototype.hashBlock = function (blockData) {
  
}


module.exports = Blockchain;
