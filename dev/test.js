const Blockchain = require('./blockchain');

const solution = new Blockchain();

solution.createNewBlock(6548654, 'KFGKHFKYFKHKG', 'HKUGLUIHLIKYGK');

solution.createNewTransaction(100, 'ALEX-SENDER-ADDR', 'JENN-RECIPIENT-ADDR');

solution.createNewBlock(1326987, 'JHFKVKKYFKHKG', 'KJHBKJHVKHLIKYGK');

console.log(solution.chain[1]);