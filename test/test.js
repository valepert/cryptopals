/* global test, expect */
const { hex2base64, fixedXor, singleByteXor } = require('../index')


test('Convert hex to base64', () => {
  expect(
    hex2base64('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d')
  ).toBe('SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t')
})

test('Fixed XOR', () => {
  expect(
    fixedXor('1c0111001f010100061a024b53535009181c', '686974207468652062756c6c277320657965')
  ).toBe('746865206b696420646f6e277420706c6179')
})

test('Single-byte XOR cipher', () => {
  expect(
    singleByteXor('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736')
  ).toBe('Cooking MC\'s like a pound of bacon')
})