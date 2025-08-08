const reverseString = require('./reverse-string');

test("Reverse string", () => {
    expect(reverseString("hello")).toBe("olleh")
})