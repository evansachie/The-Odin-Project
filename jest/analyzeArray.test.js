const analyzeArray = require('./analyzeArray');

test("Analyze array returns correct object", () => {
    const result = analyzeArray([1, 8, 3, 4, 2, 6]);
    
    expect(result).toEqual({
        average: 4,
        min: 1,
        max: 8,
        length: 6
    });
});

test("Analyze array with different values", () => {
    const result = analyzeArray([1, 2, 3, 4, 5]);
    
    expect(result).toEqual({
        average: 3,
        min: 1,
        max: 5,
        length: 5
    });
});

test("Throws error for empty array", () => {
    expect(() => analyzeArray([])).toThrow("Array cannot be empty");
});