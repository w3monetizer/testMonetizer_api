const express = require('express');
const app = express();
 
// ~/blockchain
app.get('/solution', function (req, res) {

});
 
// ~/transaction
app.post('/commit', function (req, res) {

});

// ~/mine
app.get('/test', function (req, res) {

});

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});