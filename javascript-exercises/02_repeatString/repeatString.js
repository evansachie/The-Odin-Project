const repeatString = function(char, num) {
    res = ''
    if (num < 0){
        return "ERROR"
    }
    for(i = 0; i < num; i++){
        res += char
    }
    return res
};

// Do not edit below this line
module.exports = repeatString;
