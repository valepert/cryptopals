/* global test, expect */
const { hex2base64, fixedXor, singleByteXor, detectCharXor, repeatKeyXor, findKeySize, breakCode } = require('../index')

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

test('Detect single-character XOR', () => {
  expect(
    detectCharXor('4.txt')
  ).toBe('Now that the party is jumping')
})

test('Implement repeating-key XOR', () => {
  expect(
    repeatKeyXor('ICE')(
      'Burning \'em, if you ain\'t quick and nimble\nI go crazy when I hear a cymbal'
    )).toBe(
    '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f'
  )
})

test('Break repeating-key XOR', () => {
  const KEYSIZE = findKeySize('6.txt', 2, 40)
  expect(KEYSIZE).toBe(29)

  expect(breakCode('6.txt')(KEYSIZE)).toBe()
})
