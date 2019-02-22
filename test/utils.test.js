/* global test, expect */

const { hexToBinary, binaryToHex, char2num } = require('../utils')

test.skip('x == binaryToHex(hexToBinary(x)', () => {
  expect(
    binaryToHex(hexToBinary('6c2c4f676953959d64e63b007c263d7085852968'))
  ).toBe('6c2c4f676953959d64e63b007c263d7085852968')
})

test.skip('char2num', () => {
  expect(char2num('AZ-az')).toEqual([65, 90, 45, 97, 122])
})
