const caesarCipher = require('./caesarCipher');

describe('Caesar Cipher', () => {
    test('shifts letters correctly', () => {
        expect(caesarCipher('abc', 3)).toBe('def');
    });
    
    test('wraps from z to a', () => {
        expect(caesarCipher('xyz', 3)).toBe('abc');
    });
    
    test('preserves case', () => {
        expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
    });
    
    test('preserves punctuation and spaces', () => {
        expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
    });
    
    test('handles negative shifts', () => {
        expect(caesarCipher('abc', -3)).toBe('xyz');
    });
    
    test('handles large shifts', () => {
        expect(caesarCipher('abc', 29)).toBe('def'); // 29 % 26 = 3
    });
});
