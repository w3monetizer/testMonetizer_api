// Binary Search Tree - BST constructor
function BST(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

// BST insert method
BST.prototype.insert = function (value) {
  if (value <= this.value) {
    if (!this.left) this.left = new BST(value);
    else this.left.insert(value);
  }
  else if (value > this.value) {
    if (!this.right) this.right = new BST(value);
    else this.right.insert(value);
  }
};

let bst = new BST(50);