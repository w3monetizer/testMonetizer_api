const express = require('express');
const bodyParser = require('body-parser');

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
app.post('/commit', function (req, res) {
  const blockIndex = solution.createNewTransaction(
    req.body.amount, req.body.sender, req.body.recipient,
    req.body.commit,
    req.body.senderRepo,      // project repo //
    req.body.recipientRepo,   // service repo //
    req.body.recipientBranch  // service repo branch for the project //
  );
  res.json({ note: `Commit will be added in block ${blockIndex}.` })
});

// ~/mine
app.get('/test', function (req, res) {

});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});