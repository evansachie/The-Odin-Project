function analyzeArray(array) {
    if (array.length === 0) {
        throw new Error("Array cannot be empty");
    }
    
    const sum = array.reduce((acc, curr) => acc + curr, 0);
    
    return {
        average: sum / array.length,
        min: Math.min(...array),
        max: Math.max(...array),
        length: array.length
    };
}

module.exports = analyzeArray;
