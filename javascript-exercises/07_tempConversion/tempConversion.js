const convertToCelsius = function(fah) {
  result = (fah - 32) * 5 / 9
  return Number(result.toFixed(1))
  // Math.round(result * 10 / 10) also works
  
};

const convertToFahrenheit = function(cel) {
  result =  (cel * 9 / 5 + 32)
  return Number(result.toFixed(1))

};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
