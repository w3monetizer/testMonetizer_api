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

// Insert() method - take the Key and value, create a node, place node in the correct bucket
HashTable.prototype.insert = function (key, value) {
  const index = this.hash(key);
  if (!this.buckets[index]) this.buckets[index] = new HashNode(key, value);
  else {
    let currentNode = this.buckets[index];
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new HashNode(key, value);
  }
}


// Viz and Test HashTable
let myHT = new HashTable(30);
// console.log(myHT);

// console.log( myHT.hash('Becca')); // 12 - a number between 0 and numBuckets-1

// Examples of 'string'.charCodeAt() & modulus %
// console.log('hello world'.charCodeAt(1));  // 101 - Unicode for 'e'
// console.log('hello world'.charCodeAt(4));  // 111 - Unicode for 'o'
// console.log(100 % 30);  // 10