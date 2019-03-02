const R = require('ramda')

const { binaryToHex, hexToBinary, binaryToString, readHexStrings, removeTrailNewline, padding } = require('./utils')
const { alphadigits, fitness, hamming } = require('./utils')

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

const detectCharXor2 = (strings) =>
  R.prop('output',
    getMaxFitness(
      R.pipe(
        R.map((x) => (charXor(x))),
        R.map((x) => (R.propOr('', 'output', x)))
      )(strings)))

// Set 1 / Challenge 5
// Implement repeating-key XOR
const repeatKeyXor = (key) => (string) =>
  fixedXor(
    binaryToHex(string),
    binaryToHex(padding(key, string.length))
  )

// Set 1 / Challenge 6
// Break repeating-key XOR
const testKeySize = (string) => (keysize) => (
  {
    keysize,
    avg_distance: R.mean(
      R.map(
        (x) => hamming(R.head(x), R.last(x)) / keysize,
        R.splitEvery(2, string)
      )
    )
  }
)

const base64toString = (string) => Buffer.from(string, 'base64').toString()
const base64 = (string) => Buffer.from(string, 'base64')

const findKeySize = (fileName, min, max) =>
  R.prop('keysize',
    R.reduce(
      R.minBy(R.prop('avg_distance')), { 'avg_distance': +Infinity },
      R.map(
        (ks) => (testKeySize(R.splitEvery(ks, base64toString(R.reduce(R.concat, '', readHexStrings(fileName)))))(ks))
      )(R.range(min, max + 1))
    )
  )

// TODO:
const breakCode = (fileName) => (keysize) => (
  R.map(
    (x) => bruteForceXor(x)
  )(R.transpose(
    R.splitEvery(keysize, base64(R.reduce(R.concat, '', readHexStrings(fileName))))
  )
  )
)

module.exports = {
  hex2base64,
  fixedXor,
  singleByteXor,
  detectCharXor,
  repeatKeyXor,
  findKeySize,
  breakCode
}
