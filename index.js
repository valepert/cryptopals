const R = require('ramda')

const { binaryToHex, hexToBinary, binaryToString, readHexStrings, removeTrailNewline, padding } = require('./utils')
const { alphadigits, fitness } = require('./utils')

const hexPairXOR = (left, right) =>
  R.map(
    (x) => (R.head(x) ^ R.tail(x)),
    R.zip(
      hexToBinary(left),
      hexToBinary(right)
    ))

// Set 1 / Challenge 1
// Convert hex to base64
const hex2base64 = (string) => Buffer.from(string, 'hex').toString('base64')

// Set 1 / Challenge 2
// Write a function that takes two equal-length buffers and produces their XOR combination.
const fixedXor = (string, xor) => binaryToHex(hexPairXOR(string, xor))

const valueXor = (string) => (value) =>
  binaryToString(
    hexPairXOR(
      string,
      R.repeat([value], string.length)
    )
  )

const bruteForceXor = (string) =>
  R.map(valueXor(string))(alphadigits)

const getMaxFitness = (array) => R.reduce(
  R.maxBy(R.prop('fitness')), { 'fitness': 0 },
  R.map(
    (x) => ({ output: x, fitness: fitness(x) })
  )(array))

// Set 1 / Challenge 3
// Decrypt the message, find the character XOR'd
const singleByteXor = (string) =>
  R.prop('output',
    getMaxFitness(bruteForceXor(string))
  )

const charXor = (string) =>
  getMaxFitness(bruteForceXor(string))

// Set 1 / Challenge 4
// Detect single-character XOR
const detectCharXor = (fileName) =>
  removeTrailNewline(
    R.prop('output',
      getMaxFitness(
        R.pipe(
          R.map((x) => (charXor(x))),
          R.map((x) => (R.propOr('', 'output', x)))
        )(readHexStrings(fileName)))
    )
  )

// Set 1 / Challenge 5
// Implement repeating-key XOR
const repeatKeyXor = (key) => (string) =>
  fixedXor(
    binaryToHex(string),
    binaryToHex(padding(key, string.length))
  )

module.exports = {
  hex2base64,
  fixedXor,
  singleByteXor,
  detectCharXor,
  repeatKeyXor
}
