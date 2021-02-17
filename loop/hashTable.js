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
// Also to update value for a key
HashTable.prototype.insert = function (key, value) {
  const index = this.hash(key);
  if (!this.buckets[index]) {
    this.buckets[index] = new HashNode(key, value);
  }
  else if (this.buckets[index].key === key) {  // check the first node in the bucket
    this.buckets[index].value = value;  // update the value of the first node in the bucket
  }
  else {
    let currentNode = this.buckets[index];
    while (currentNode.next) {  // use .next to check up to the last node in chain
      if (currentNode.next.key === key) {
        // the key already exist on the hash node linked list
        currentNode.next.value = value; // update value for the key
        return;
      }
      currentNode = currentNode.next;
    }
    currentNode.next = new HashNode(key, value);
  }
}


// Viz and Test HashTable
let myHT = new HashTable(30);
// console.log(myHT);

// Testing insert()
myHT.insert('Dean', 'dean@gmail.com');
myHT.insert('Megan', 'megan@gmail.com');
myHT.insert('Dane', 'dane@gmail.com');  // Collision because hash('Dean') = hash('Dane')
myHT.insert('Dean', 'deanmachine@gmail.com');
myHT.insert('Megan', 'megansmith@gmail.com');
myHT.insert('Dane', 'dane1010@outlook.com');

console.log(myHT.buckets);

// console.log( myHT.hash('Becca')); // 12 - a number between 0 and numBuckets-1

// Examples of 'string'.charCodeAt() & modulus %
// console.log('hello world'.charCodeAt(1));  // 101 - Unicode for 'e'
// console.log('hello world'.charCodeAt(4));  // 111 - Unicode for 'o'
// console.log(100 % 30);  // 10