const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid').v1;  // To create an Unique Random ID for the current node
const rp = require('request-promise');

const port = process.argv[2]; // To read the port from command args after webNode

const nodeAddress = uuid().split('-').join(''); // remove the '-' from the node ID

const Blockchain = require('./blockchain');

const solution = new Blockchain();

const app = express();

app.use(bodyParser.json());  // for parsing json req.body
app.use(bodyParser.urlencoded({ extended: false }));  // for parsing req.body form data
 
// Get entire solution blockchain ~ /blockchain
app.get('/solution', function (req, res) {
  res.send(solution);
});
 
// Create a new contribution ~ /transaction
app.post('/contribution', function (req, res) {
  const newContribution = req.body;
  const blockIndex = solution.addTransactionToPendingTransactions(newContribution);
  res.json({ note: `Contribution will be added in block ${blockIndex}` });
});


// ~/transaction/broadcast
app.post('/contribution/broadcast', function (req, res) {
  const newContribution = solution.createNewTransaction(
    req.body.amount, req.body.sender, req.body.recipient,
    req.body.commit,
    req.body.senderRepo,
    req.body.recipientRepo,
    req.body.recipientBranch
  );
  // add Contribution to local node pendingTransactions
  solution.addTransactionToPendingTransactions(newContribution); 

  const requestPromises = [];
  solution.webNodes.forEach(webNodeUrl => { // broadcast to all web nodes
    const requestOptions = {
      uri: webNodeUrl + '/contribution',
      method: 'POST',
      body: newContribution,
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
    .then(data => {
      res.json({ note: 'Contribution created and broadcast successfully.' });
    });
});


// ~/mine /test a solution block
app.get('/test', function (req, res) {
  const lastBlock = solution.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: solution.pendingTransactions,
    index: lastBlock['index'] + 1
  }

  // ToDo: Add Method to Solution blockchain.js for testing all pending Contributions
  // Only Tested and Approved Contributions will be part of the block

  const nonce = solution.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = solution.hashBlock(previousBlockHash, currentBlockData, nonce);

  // Adding a testing/mining reward for the tester node of $12.5 ATP / WTP 
  // Refactor Option : ToDo replace 12.5 bitcoin with 
  //   - eg: a % of project budget * % of tests passed
  //   - Test reward rule to be defined in the public project repo 
  // solution.createNewTransaction(12.5, "Project/BudgetOwnerAddr", nodeAddress);
  // moved to broadcast after creating the new block, broadcast test tx reward

  const newBlock = solution.createNewBlock(nonce, previousBlockHash, blockHash);
  
  // Broadcast new block of contributions to the network
  const requestPromises = [];
  solution.webNodes.forEach(webNodeUrl => {
    const requestOptions = {
      uri: webNodeUrl + '/receive-new-block',
      method: 'POST',
      body: { newBlock: newBlock },
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
    .then(data => {
      // Create and broadcast new mining/testing reward transaction
      const requestOptions = {
        uri: solution.currentNodeUrl + '/contribution/broadcast',
        method: 'POST',
        body: {
          amount: 12.5,
          sender: "Project/BudgetOwnerAddr",
          recipient: nodeAddress
        },
        json: true
      };
      return rp(requestOptions);
    })
    .then(data => {
      res.json({
        note: "New solution block mined/tested & broadcast successfully",
        block: newBlock
      });
    });
});


app.post('/receive-new-block', function (req, res) {
  const newBlock = req.body.newBlock;
  // Check if block is legitimate, fits into the chain / hashes
  // Check  if prev block hash / new block = hash of last block in local chain
  const lastBlock = solution.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const correctIndex = lastBlock['index'] + 1 === newBlock['index'];

  if (correctHash && correctIndex) {
    solution.chain.push(newBlock);
    solution.pendingTransactions = [];
    res.json({
      note: 'New block received and accepted.',
      newBlock: newBlock
    })
  } else {
    res.json({
      note: 'New block rejected.',
      newBlock: newBlock
    })
  }
});


// register a node and broadcast it to the whole network
app.post('/register-and-broadcast-node', function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  // Register the node on the current server
  // then broadcast to the net/servers which will accept the new node on /register-node endpoint
  // the other servers do not have to broadcast the new node !!
  if (solution.webNodes.indexOf(newNodeUrl) == -1) solution.webNodes.push(newNodeUrl);

  const regNodesPromises = [];  // register nodes promises array
  solution.webNodes.forEach(webNodeUrl => {
    // hit the /register-node endpoint on all other nodes to broadcast the new node
    const requestOptions = {
      uri: webNodeUrl + '/register-node',
      method: 'POST',
      body: { newNodeUrl: newNodeUrl },
      json: true
    };

    regNodesPromises.push(rp(requestOptions));  // async POST requests to outside nodes
  });

  Promise.all(regNodesPromises)
    .then(data => {
      // use the response data from the POSTs to prep bulk registrations on the new node
      const bulkRegisterOptions = {
        uri: newNodeUrl + '/register-nodes-bulk',
        method: 'POST',
        body: { allWebNodes: [...solution.webNodes, solution.currentNodeUrl] },
        json: true
      };

      return rp(bulkRegisterOptions);
    })
    .then(data => {
      res.json({ note: 'New node registered with network successfully.' })
    });
});


// register a node with the network
app.post('/register-node', function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = solution.webNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = solution.currentNodeUrl !== newNodeUrl;
  if(nodeNotAlreadyPresent && notCurrentNode) solution.webNodes.push(newNodeUrl);
  res.json({ note: 'New node registered successfully.' });
});


// register multiple nodes (all solution net) at once - with the new node
app.post('/register-nodes-bulk', function (req, res) {
  const allWebNodes = req.body.allWebNodes;
  allWebNodes.forEach(webNodeUrl => {
    const nodeNotAlreadyPresent = solution.webNodes.indexOf(webNodeUrl) == -1;
    const notCurrentNode = solution.currentNodeUrl !== webNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) solution.webNodes.push(webNodeUrl);
  });

  res.json({ note: 'Bulk registration successful.' });
});


app.get('/consensus', function (req, res) {
  // Make request to all other nodes in the net to get their solution chains !!
  // and compare them to the solution chain hosted on the current node !!
  const requestPromises = [];
  solution.webNodes.forEach(webNodeUrl => {
    const requestOptions = {
      uri: webNodeUrl + '/solution',
      method: 'GET',
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
    .then(solutions => { // solutions = the solution blockchains from all nodes
      // Check if there is a blockchain that is longer(faster, cheaper, etc) etc than the others
      const currentChainLength = solution.chain.length;
      let maxChainLength = currentChainLength;
      let newLongestChain = null;
      let newPendingTransactions = null;

      solutions.forEach(solution => {        
        // Identify the longer (faster, cheaper, etc ) solution
        if (solution.chain.length > maxChainLength) {
          maxChainLength = solution.chain.length;
          newLongestChain = solution.chain;
          newPendingTransactions = solution.pendingTransactions;
        };
      });

      // ToDo: Check if need to replace solution (~bitcoin) with branch(es)??
      // or include a branch/fork info in the genesis block 
      // or fork branch(es) on contributing services with multiple options/mapings
      if (!newLongestChain || (newLongestChain && !solution.chainIsValid(newLongestChain))) {
        res.json({
          note: 'Current solution chain has not been replaced.',
          chain: solution.chain
        });
      } else {
        solution.chain = newLongestChain;
        solution.pendingTransactions = newPendingTransactions;
        res.json({
          note: 'This solution chain has been replaced.',
          chain: solution.chain
        })
      };
    });
});


// Get the block with the provided hash
app.get('/block/:blockHash', function (req, res) {

});


app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
});
