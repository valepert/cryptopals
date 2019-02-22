const hexToBinary = (hex) => Buffer.from(hex, 'hex')
const binaryToHex = (binary) => Buffer.from(binary).toString('hex')
const binaryToString = (binary) => Buffer.from(binary).toString()
const char2num = (char) => Array.from(Buffer.from(char))

module.exports = {
  hexToBinary,
  binaryToHex,
  binaryToString,
  char2num,
}
