const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());  // for parsing json req.body
app.use(bodyParser.urlencoded({ extended: false }));  // for parsing req.body form data
 
// ~/blockchain
app.get('/solution', function (req, res) {

});
 
// ~/transaction
app.post('/commit', function (req, res) {
  console.log(req.body);
  res.send(`The amount of the transaction is ${req.body.amount} ATP.`);
});

// ~/mine
app.get('/test', function (req, res) {

});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});