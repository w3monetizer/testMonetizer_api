const Blockchain = require('./blockchain');

const solution = new Blockchain();

solution.createNewBlock(6548654, 'KFGKHFKYFKHKG', 'HKUGLUIHLIKYGK');

solution.createNewTransaction(100, 'ALEX-SENDER-ADDR', 'JENN-RECIPIENT-ADDR');

solution.createNewBlock(1326987, 'JHFKVKKYFKHKG', 'KJHBKJHVKHLIKYGK');

solution.createNewTransaction(50, 'ALEX-SENDER-ADDR', 'JENN-RECIPIENT-ADDR');
solution.createNewTransaction(300, 'ALEX-SENDER-ADDR', 'JENN-RECIPIENT-ADDR');
solution.createNewTransaction(2000, 'ALEX-SENDER-ADDR', 'JENN-RECIPIENT-ADDR');

console.log(solution);