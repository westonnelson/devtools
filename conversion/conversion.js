const bs58 = require('bs58');
const Web3 = require('web3');

// Helper function to convert hexadecimal to base58
function hexToBase58(hexString) {
    if (!Web3.utils.isHex(hexString)) {
        throw new Error('Invalid hexadecimal string');
    }
    const bytes = Buffer.from(hexString.slice(2), 'hex'); // Remove '0x' prefix and convert to bytes
    return bs58.encode(bytes); // Encode bytes to base58
}

// Helper function to convert base58 to hexadecimal
function base58ToHex(base58String) {
    try {
        const bytes = bs58.decode(base58String); // Decode base58 to bytes
        return '0x' + Buffer.from(bytes).toString('hex'); // Convert bytes to hex and add '0x' prefix to the string
    } catch (error) {
        throw new Error('Invalid base58 string');
    }
}

// Export these 2 functions for reusability in other modules
module.exports = {
    hexToBase58,
    base58ToHex
};
