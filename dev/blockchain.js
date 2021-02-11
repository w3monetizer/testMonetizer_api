const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];  // get the node url from the start cmd
const uuid = require('uuid').v1;  // To create Unique Random IDs for tx, etc

const TRUST_STRING = '0';  // '0' or null for W3 solution Monetizer Dev; '0000' for bitcoin Dev

function Blockchain(repo) {
  this.chain = [];  // to store  all solution blocks / validated tx/contrib
  this.pendingTransactions = [];  // to store new contributions/tx before being tested/mined

  this.currentNodeUrl = currentNodeUrl;
  this.webNodes = [];

  // this.createNewBlock(100, '0', '0'); // For Genesis can be Arbitrary params for solution/bitcoin js Dev
  // this.createNewBlock(Object.keys(repo).length, 'OWNER_STEFIAN', 'REPO_URL'); 
  this.createNewBlock(33865295, 'stefian', 'https://github.com/w3monetizer/testMonetizer_api'); 
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
    transactionId: uuid().split('-').join(''),  // Unique Random Tx Id
    commit,
    senderRepo,
    recipientRepo,
    recipientBranch
  } // commit, senderRepo, recipientRepo, recipientBranch required for coMonetizer

  return newTransaction;
}


Blockchain.prototype.addTransactionToPendingTransactions = function (transactionObj,) {
  this.pendingTransactions.push(transactionObj);
  return this.getLastBlock()['index'] + 1;
};


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
  // for w3Monetizer Dev we will leave it at '0' instead of '0000' 
  while (hash.substring(0, TRUST_STRING.length) !== TRUST_STRING) { 
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    // console.log(nonce, hash); // for testing - listing nonces & hashes
  }

  return nonce; // the nounce found where the hash starts with x zeros
}

// ToDo: Parametrize Genesis block !!! (solution blockchain)
Blockchain.prototype.chainIsValid = function (solution) {
  // Iterate over blocks and ensure all hashes line up correctly
  // Check that the block.previousBlockHash === (prev block).hash
  let validChain = true;

  for (var i = 1; i < solution.length; i++) {
    const currentBlock = solution[i];
    const prevBlock = solution[i - 1];
    // validate the data in all blocks by checking hashes start with TRUST_STRING
    const blockHash = this.hashBlock(
      prevBlock['hash'],
      {
        transactions: currentBlock['transactions'],
        index: currentBlock['index']
      },
      currentBlock['nonce']
    );
    if (blockHash.substring(0, TRUST_STRING.length) !== TRUST_STRING) validChain = false;

    if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
  
    // console.log('previousBlockHash => ', prevBlock['hash']);
    // console.log('currentBlockHash => ', currentBlock['hash']);
  };

  // Validate Genesis block 
  // ToDo: Parametrize Genesis block !!! (solution blockchain)
  const genesisBlock = solution[0];
  const correctNonce = genesisBlock['nonce'] === 33865295; // ToDo: Parametrize! // 100 for bitcoin
  const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === 'stefian'; // ToDo: Parametrize! // '0' for bitcoin
  const correctHash = genesisBlock['hash'] === 'https://github.com/w3monetizer/testMonetizer_api'; // ToDo: Parametrize! // '0' for bitcoin
  const correctTransactions = genesisBlock['transactions'].length === 0;

  if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

  return validChain;
};


// Iterate through the blockchains and search for the block/branch with the blockHash
Blockchain.prototype.getBlock = function (blockHash) {
  let correctBlock = null;
  this.chain.forEach(block => {
    if (block.hash === blockHash) correctBlock = block;
  });

  return correctBlock;
};


// Get details of tx with a given Id - tx could be Contribution or Test(mine) !!
Blockchain.prototype.getTransaction = function (transactionId) {
  
};


module.exports = Blockchain;
