function factorial(num) {
  if (num === 1) {  // base case
    return num;
  } else {  // recursive case
    return num * factorial(num - 1);
  }
}