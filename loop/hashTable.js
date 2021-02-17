// HashTable Constructor
function HashTable(size) {
  this.buckets = Array(size);
  this.numBuckets = this.buckets.length;
}

// Viz and Test HashTable
let myHT = new HashTable(30);
console.log(myHT);
