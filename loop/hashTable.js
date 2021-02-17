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

// Viz and Test HashTable
let myHT = new HashTable(30);
console.log(myHT);
