const R = require('ramda')

const { binaryToHex, hexToBinary, binaryToString } = require('./utils')

// Set 1 / Challenge 1
// Convert hex to base64
const hex2base64 = (string) => Buffer.from(string, 'hex').toString('base64')

// Set 1 / Challenge 2
// Write a function that takes two equal-length buffers and produces their XOR combination.
const fixedXor = (string, xor) => 
  binaryToHex(
    R.map(
      (x) => (R.head(x) ^ R.tail(x)),
      R.zip(
        hexToBinary(string),
        hexToBinary(xor),
      ))
  )

const valueXor = (string) => (value) => 
  binaryToString(
    R.map(
      (x) => (R.head(x) ^ R.tail(x)),
      R.zip(
        hexToBinary(string),
        R.repeat([value], string.length)
      ))
  )

const byteXor = (string) => 
  R.map(
    valueXor(string)
  )(R.range(64, 100))

// Set 1 / Challenge 3
// Decrypt the message, find the character XOR'd
const singleByteXor = (string) =>
  R.prop('output',
    R.reduce(
      R.maxBy(
        R.prop('fitness')
      )
      , {'fitness': 0},
      R.map(
        (x) => ({output: x, fitness: R.length(R.match(/o/g, x))})
      )(byteXor(string))
    )
  )

module.exports = {
  hex2base64,
  fixedXor,
  singleByteXor
}