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


Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
  const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
}

// solution.hashBlock(previousBlockHash, currentBlockData, nonce); // nonce++ at each iteration
// => repeatedly hash block until it finds correct hash => '0000HASHSTARTINNGWITH4ZEROS'
// => uses current block data for the hash, but also the previousBlockHash
// => continuously changes nonce value until it finds the correct hash
// => returns to us the nonce value that creates the correct hash
Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
  
  // ToDo: First Test current Block Data (commits, etc against test scripts in the project repo) 

  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 1) !== '0') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    console.log(nonce, hash); // for testing - listing nonces & hashes
  }

  return nonce; // the nounce found where the hash starts with x zeros
}


module.exports = Blockchain;
