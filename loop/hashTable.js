// HashTable Constructor
function HashTable(size) {
  this.buckets = Array(size);
  this.numBuckets = this.buckets.length;
}

// HashNode Constructor
function HashNode(key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next || null;
}

// Hash method for hashing the key string into a number
HashTable.prototype.hash = function (key) {
  // Add all unicode values for the chars in the key string into a large number
  let total = 0;
  for (let i = 0; i < key.length; i++) {
    total += key.charCodeAt(i);
  }
  const bucket = total % this.numBuckets;
  return bucket;
}

// Viz and Test HashTable
let myHT = new HashTable(30);
console.log(myHT);

// Examples of 'string'.charCodeAt() & modulus %
// console.log('hello world'.charCodeAt(1));  // 101 - Unicode for 'e'
// console.log('hello world'.charCodeAt(4));  // 111 - Unicode for 'o'
// console.log(100 % 30);  // 10