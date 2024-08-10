const sumAll = function(start, end) {
    if (start < 0 || end < 0){
        return 'ERROR'
    }
    if (!Number.isInteger(start) || !Number.isInteger(end)){
        return "ERROR"
    }

    minn = Math.min(start, end)
    maxx = Math.max(start, end)

    res = start + end
    for(i = minn + 1; i< maxx; i++){
        res += i
    }

    return res

};

// Do not edit below this line
module.exports = sumAll;
