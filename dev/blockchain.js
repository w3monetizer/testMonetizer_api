function Blockchain(repo) {
  this.chain = [];  // to store  all blocks / validated tx/contrib
  this.newTransactions = [];  // to store new contributions/tx before being tested/mined
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.lenght + 1,
    timestamp: Date.now(),
    transactions: this.newTransactions,
    nonce: nonce, // Proof of work - a number - proof that we created the block in a legitimate way
    hash: hash, // data from our new block - all new tx compressed in a single string
    previousBlockHash: previousBlockHash  // the data hashed of the previous block
  };

  this.newTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
}

module.exports = Blockchain;
