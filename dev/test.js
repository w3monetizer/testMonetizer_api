const Blockchain = require('./blockchain');
const solution = new Blockchain();

const previousBlockHash = 'HKTYKVKVYTCJYTCJYTCVJRDJC';
const currentBlockData = [
  {
    amount: 10,
    sender: 'HGDRVHGFBJHFJF',
    recipient: 'FSDVHGGKUGKFJYT'
  },
  {
    amount: 30,
    sender: 'KJGKJVKUHGFBJHFJF',
    recipient: 'JHDHDVDTKUGKFJYT'
  },
  {
    amount: 200,
    sender: 'JHFJHGJYFTJYDJ',
    recipient: 'HGRDFJFKFGJDD'
  },
];
const nonce = 100;


console.log(solution.hashBlock(previousBlockHash, currentBlockData, nonce));