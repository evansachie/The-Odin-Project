const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const sum = function(arr) {
	return arr.reduce((tot, val) => tot + val, 0);
};

const multiply = function(arr) {
  return arr.reduce((prod, curr) => prod * curr)
};

const power = function(a, b) {
	return a ** b;
  // return Math.pow(a, b);
};

const factorial = function(num) {
	if (n == 0 || n == 1){
    return n;
  }
  return n * factorial(n - 1);
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
