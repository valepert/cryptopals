const R = require('ramda')

const { binaryToHex, hexToBinary, binaryToString, readHexStrings, fitness } = require('./utils')

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
        hexToBinary(xor)
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

const bruteForceXor = (string) =>
  R.map(
    valueXor(string)
  )(R.concat(
    R.range('0'.charCodeAt(0), '9'.charCodeAt(0)),
    R.range('A'.charCodeAt(0), 'Z'.charCodeAt(0)),
    R.range('a'.charCodeAt(0), 'z'.charCodeAt(0))
  ))

const getMaxFitness = (array) => R.reduce(
  R.maxBy(
    R.prop('fitness')
  ), { 'fitness': 0 },
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

const removeTrailNewline = (string) =>
  R.without('\n', string).join('')

// Set 1 / Challenge 4
// Detect single-character XOR
const detectCharXor = (fileName) =>
  removeTrailNewline(
    R.prop('output',
      getMaxFitness(
        R.map(
          (x) => (R.propOr('', 'output', x))
        )(R.map(
          (x) => (charXor(x))
        )(readHexStrings(fileName)))
      )
    )
  )

module.exports = {
  hex2base64,
  fixedXor,
  singleByteXor,
  detectCharXor
}
