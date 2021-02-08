const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid').v1;  // To create an Unique Random ID for the current node

const port = process.argv[2]; // To read the port from command args after webNode

const nodeAddress = uuid().split('-').join(''); // remove the '-' from the node ID

const Blockchain = require('./blockchain');

const solution = new Blockchain();

const app = express();

app.use(bodyParser.json());  // for parsing json req.body
app.use(bodyParser.urlencoded({ extended: false }));  // for parsing req.body form data
 
// ~/blockchain
app.get('/solution', function (req, res) {
  res.send(solution);
});
 
// ~/transaction
app.post('/pullRequest', function (req, res) {
  const blockIndex = solution.createNewTransaction(
    req.body.amount, req.body.sender, req.body.recipient,
    req.body.commit,
    req.body.senderRepo,      // project repo //
    req.body.recipientRepo,   // service repo //
    req.body.recipientBranch  // service repo branch for the project //
  );
  res.json({ note: `Pull Request (Offer) will be added in block ${blockIndex}.` });
});

// ~/mine /test a solution block
app.get('/test', function (req, res) {
  const lastBlock = solution.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: solution.pendingTransactions,
    index: lastBlock['index'] + 1
  }
  const nonce = solution.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = solution.hashBlock(previousBlockHash, currentBlockData, nonce);

  // Adding a testing/mining reward for the tester node of $12.5 ATP / WTP 
  // Refactor Option : ToDo replace 12.5 bitcoin with 
  //   - eg: a % of project budget * % of tests passed
  //   - Test reward rule to be defined in the public project repo 
  // Refactor Option : ToDo replace "00" with Owner/Project Repo
  solution.createNewTransaction(12.5, "Project/BudgetOwnerAddr", nodeAddress);

  const newBlock = solution.createNewBlock(nonce, previousBlockHash, blockHash);
  res.json({
    note: "New solution block mined/tested successfully",
    block: newBlock
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});