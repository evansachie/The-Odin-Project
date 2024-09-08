const palindromes = function (str) {
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    return cleanStr === cleanStr.split('').reverse().join('');

    
};

// Do not edit below this line
module.exports = palindromes;
