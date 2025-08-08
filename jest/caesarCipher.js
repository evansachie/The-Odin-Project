function caesarCipher(string, shift) {
    return string.split('').map(char => {
        // Check if character is a letter
        if (/[a-zA-Z]/.test(char)) {
            // Determine if uppercase or lowercase
            const isUpperCase = char === char.toUpperCase();
            const charCode = char.toLowerCase().charCodeAt(0);
            
            // Calculate shifted position (a=0, b=1, ..., z=25)
            const alphabetPosition = charCode - 97; // 'a' is 97 in ASCII
            const shiftedPosition = (alphabetPosition + shift) % 26;
            
            // Handle negative shifts (wrap around)
            const normalizedPosition = shiftedPosition < 0 ? shiftedPosition + 26 : shiftedPosition;
            
            // Convert back to character
            const newChar = String.fromCharCode(normalizedPosition + 97);
            
            // Preserve original case
            return isUpperCase ? newChar.toUpperCase() : newChar;
        }
        
        // Return non-alphabetical characters unchanged
        return char;
    }).join('');
}

module.exports = caesarCipher;
