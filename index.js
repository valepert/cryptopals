const R = require('ramda')

const utils = require('./utils')
const { alphabet } = require('./utils')
const { fitness } = require('./fitness')

// Set 1 / Challenge 1
// Convert hex to base64
const hex2base64 = (hex) => (
  R.pipe(
    utils.hexToArray,
    utils.encode
  )(hex)
)

// Set 1 / Challenge 2
// Write a function that takes two equal-length buffers and produces their XOR combination.
const fixedXor = (string, xor) => (
  utils.arrayToHex(
    R.map(
      utils.pairXor
    )(
      R.zip(
        utils.hexToArray(string),
        utils.hexToArray(xor)
      )
    )
  )
)

// Set 1 / Challenge 3
// Decrypt the message, find the character XOR'd
const createObject = (x) => ({
  hex: x,
  msg: utils.hexToString(x),
  fitness: fitness(utils.hexToString(x))
})

const brutefunc = (str) => (character) =>
  R.assoc(
    'char',
    utils.arrayToString([character]),
    createObject(fixedXor(str, R.repeat([character], str.length)))
  )

const findCharacterXor = (string) =>
  R.prop('char')(
    utils.findMaxByProp('fitness')(
      utils.bruteforce(
        brutefunc,
        utils.hexToArray(string),
        alphabet)
    )
  )

const decryptMessage = (string) =>
  R.prop('msg')(
    utils.findMaxByProp('fitness')(
      utils.bruteforce(
        brutefunc,
        utils.hexToArray(string),
        alphabet)
    )
  )

// Set 1 / Challenge 4
// Detect single-character XOR
const detectCharXor = (fileName) =>
  utils.removeTrailNewline(
    R.prop('msg')(
      utils.findMaxByProp('fitness')(
        R.map(
          (string) =>
            utils.findMaxByProp('fitness')(
              utils.bruteforce(
                brutefunc,
                string,
                alphabet
              )
            )
        )(utils.readLines(fileName))
      )
    )
  )

// Set 1 / Challenge 5
// Implement repeating-key XOR
const repeatKeyXor = (key) => (string) =>
  fixedXor(
    utils.stringToHex(string),
    utils.stringToHex(utils.padding(key, string.length))
  )

const testKeySize = (block) => (keysize) => ({
  keysize,
  distance: R.mean(
    R.map(
      (x) => utils.hammingPair(x) / keysize,
      R.splitEvery(2, block)
    )
  )
})

// Set 1 / Challenge 6
const findKeySize = (fileName, min, max) =>
  R.prop('keysize')(
    utils.findMinByProp('distance')(
      R.map(
        (ks) => testKeySize(R.splitEvery(ks, utils.decode(R.join('', utils.readLines(fileName)))))(ks)
      )(R.range(min, max + 1))
    )
  )

const breakCode = (fileName) => (keysize) =>
  R.join('',
    R.map(
      R.pipe(utils.arrayToHex, findCharacterXor)
    )(R.transpose(R.splitEvery(keysize, utils.decode(R.join('', utils.readLines(fileName)))))))

// Set 2 / Challenge 7
const aes = (fileName, key) =>
  R.pipe(
    utils.AESinECB(key)
  )(R.join('', utils.readLines(fileName)))

// Set 2 / Challenge 9
// Implement PKCS#7 padding
const pkcs7padding = (string, length) =>
  utils.arrayToString(utils.pkcs7(utils.stringToArray(string), length))

module.exports = {
  hex2base64,
  fixedXor,
  findCharacterXor,
  decryptMessage,
  detectCharXor,
  repeatKeyXor,
  findKeySize,
  breakCode,
  pkcs7padding,
  aes
}
