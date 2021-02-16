// Binary Search Tree - BST constructor
function BST(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

// BST insert() method
BST.prototype.insert = function (value) {
  if (value <= this.value) {
    if (!this.left) this.left = new BST(value);
    else this.left.insert(value); // recursive case
  }
  else if (value > this.value) {
    if (!this.right) this.right = new BST(value);
    else this.right.insert(value);  // recursive case
  }
};

// BST contains(value) method - returns true or false
BST.prototype.contains = function (value) {
  if (value === this.value) return true;
  else if (value < this.value) {
    if (!this.left) return false;
    else return this.left.contains(value);  // recursive case
  } 
  else if (value > this.value) {
    if (!this.right) return false;
    else return this.right.contains(value);  // recursive case
  }
};

// BST depthFirstTraversl(func) method - runs func() through all tree
// running on all branches down to bottom before going to next branch
// In-Order version of DFT - traversing all nodes in order from least to greatest
// the most used in practice because of the order
BST.prototype.depthFirstTraversal = function (iteratorFunc) {
  if (this.left) this.left.depthFirstTraversal(iteratorFunc);  // recursive case
  iteratorFunc(this.value);
  if (this.right) this.right.depthFirstTraversal(iteratorFunc);  // recursive case
};

// BST Testing
let bst = new BST(50);

bst.insert(30);
bst.insert(70);
bst.insert(100);
bst.insert(60);
bst.insert(59);
bst.insert(20);
bst.insert(45);
bst.insert(35);
bst.insert(85);
bst.insert(105);
bst.insert(10);

// Testing depthFirstTraversal()
bst.depthFirstTraversal(log);

// Defining the iterator function - log()
function log(value) {
  console.log(value);
}


// Testing contains()
// console.log(bst.contains(50));
// console.log(bst.contains(15));


// Testing insert()
// console.log(bst);
// console.log(bst.right.left.left);
// console.log(bst.left.right.left);
// console.log(bst.right.right);
