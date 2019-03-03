const crypto = require('crypto')
const fs = require('fs')
const R = require('ramda')

const readLines = (fileName) => fs.readFileSync(fileName, 'ascii').split('\n')
const removeTrailNewline = (string) => R.without('\n', string).join('')

const arrayToString = (array) => Buffer.from(array).toString('ascii')
const stringToArray = (string) => Array.from(Buffer.from(string))

const hexToString = (hex) => Buffer.from(hex, 'hex').toString()
const stringToHex = (string) => Buffer.from(string).toString('hex')

const hexToArray = (hex) =>
  R.pipe(
    hexToString,
    stringToArray
  )(hex)

const arrayToHex = (array) =>
  R.pipe(
    arrayToString,
    stringToHex
  )(array)

// Base 64
const decode = (base64) => Array.from(Buffer.from(base64, 'base64'))
const encode = (array) => Buffer.from(array).toString('base64')

// XOR
const xor = (left, right) => (left ^ right)
const pairXor = (pair) => xor(R.head(pair), R.tail(pair))

const bruteforce = (f, fixed, variables) => R.map(f(fixed))(variables)
const numSort = (a, b) => (a - b)
const padding = (string, length) => ''.padStart(length, string)

// alphabet & digits
const lowercase = R.range('a'.charCodeAt(0), 'z'.charCodeAt(0) + 1)
const uppercase = R.range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
const digits = R.range('0'.charCodeAt(0), '9'.charCodeAt(0) + 1)
const space = ' '.charCodeAt(0)
const colon = ':'.charCodeAt(0)
const alphabet = R.concat(R.concat(lowercase, uppercase), R.concat(digits, [space, colon]))
const alphadigits = arrayToString(alphabet.sort(numSort))

const findMaxByProp = (property) => R.reduce(
  R.maxBy(R.propOr(0, property)),
  { property: 0 }
)

const findMinByProp = (property) => R.reduce(
  R.minBy(R.propOr(+Infinity, property)),
  { property: +Infinity }
)

// hamming
const toEightBits = (number) => number.toString(2).padStart(8, 0)
const hamming = (left, right) =>
  R.sum(
    R.map(
      R.pipe(pairXor, toEightBits, R.sum),
      R.zip(stringToArray(left), stringToArray(right))
    )
  )
const hammingPair = (pair) => hamming(R.head(pair), R.last(pair))

const pkcs7 = (block, length) =>
  R.concat(
    block,
    R.repeat((length - block.length), length - block.length)
  )

const AESinECB = (key) => (text) =>
  R.pipe(
    (dec) => { let r = dec.update(text, 'base64'); r += dec.final(); return r }
  )(crypto.createDecipheriv('aes-128-ecb', key, null))

module.exports = {
  readLines,
  removeTrailNewline,
  arrayToString,
  stringToArray,
  hexToString,
  stringToHex,
  hexToArray,
  arrayToHex,
  decode,
  encode,
  xor,
  pairXor,
  bruteforce,
  alphabet,
  alphadigits,
  findMaxByProp,
  findMinByProp,
  padding,
  toEightBits,
  hamming,
  hammingPair,
  pkcs7,
  AESinECB
}
