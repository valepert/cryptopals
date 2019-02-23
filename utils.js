const fs = require('fs')
const R = require('ramda')

const hexToBinary = (hex) => Buffer.from(hex, 'hex')
const binaryToHex = (binary) => Buffer.from(binary).toString('hex')
const binaryToString = (binary) => Buffer.from(binary).toString()
const char2num = (char) => Array.from(Buffer.from(char))
const readHexStrings = (fileName) => fs.readFileSync(fileName, 'ascii').split('\n')
const removeTrailNewline = (string) => R.without('\n', string).join('')
const padding = (string, length) => ''.padStart(length, string)

const alphadigits = R.concat(
  R.concat(
    R.range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1),
    R.range('a'.charCodeAt(0), 'z'.charCodeAt(0) + 1)
  ),
  R.range('0'.charCodeAt(0), '9'.charCodeAt(0) + 1))

const MALUS = -1

const frequencies = {
  a: 8.167,
  b: 1.492,
  c: 2.782,
  d: 4.253,
  e: 12.702,
  f: 2.228,
  g: 2.015,
  h: 6.094,
  i: 6.966,
  j: 0.153,
  k: 0.772,
  l: 4.025,
  m: 2.406,
  n: 6.749,
  o: 7.507,
  p: 1.929,
  q: 0.095,
  r: 5.987,
  s: 6.327,
  t: 9.056,
  u: 2.758,
  v: 0.978,
  w: 2.360,
  x: 0.150,
  y: 1.974,
  z: 0.074,
  ' ': 16.000
}

const fitness = (string) =>
  R.sum(
    R.map(
      (char) => (R.propOr(MALUS, R.toLower(char), frequencies))
    )(string))

module.exports = {
  hexToBinary,
  binaryToHex,
  binaryToString,
  char2num,
  readHexStrings,
  removeTrailNewline,
  padding,
  alphadigits,
  fitness
}
