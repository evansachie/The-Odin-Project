const capitalize = require('./capitalize');

test("Capitalize word", () => {
    expect(capitalize("happy")).toBe("Happy")
})