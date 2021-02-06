function Blockchain(repo) {
  this.chain = [];  // to store  all blocks / validated tx/contrib
  this.newTransactions = [];  // to store new contributions/tx before being tested/mined
}