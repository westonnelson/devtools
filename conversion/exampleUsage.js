const { hexToBase58, base58ToHex } = require('./conversion/conversion');

// Example usage of the Solana/EVM-compatible conversion functions
const hexString = '0x4869204c617965725a65726f2074686520667574757265206973204f6d6e69636861696e'; // Hex representation of "Hi LayerZero the future is Omnichain"
const base58String = hexToBase58(hexString);
console.log(`Base58: ${base58String}`); // Base58 representation

const convertedBackToHex = base58ToHex(base58String);
console.log(`Hex: ${convertedBackToHex}`); // Hex: 0x4869204c617965725a65726f2074686520667574757265206973204f6d6e69636861696e
