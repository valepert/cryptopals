const buffer = require('buffer');
const R = require('ramda');

const hexToBinary = (hex) => buffer.transcode(Buffer.from(hex, 'hex'), 'ascii', 'binary');
const binaryToHex = (binary) => Buffer.from(binary).toString('hex');

const hex2base64 = (string) => Buffer.from(string, 'hex').toString('base64');

const fixedXor = (string, xor) => (
  binaryToHex(
    R.map(
      (x) => (R.head(x) ^ R.tail(x)),
      R.zip(
        hexToBinary(string),
        hexToBinary(xor),
      ))
  ));

module.exports = {
  hex2base64,
  fixedXor
}