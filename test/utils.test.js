/* global describe, test, expect */

const { hexToBinary, binaryToHex, char2num, binaryToString } = require('../utils')
const { alphadigits, fitness, readHexStrings, padding, hamming, toEightBit } = require('../utils')

describe.skip(`test internal Buffer.from behaviour`, () => {
  test('x == binaryToHex(hexToBinary(x)', () => {
    expect(
      binaryToHex(hexToBinary('6c2c4f676953959d64e63b007c263d7085852968'))
    ).toBe('6c2c4f676953959d64e63b007c263d7085852968')
  })

  test('char2num', () => {
    expect(char2num('AZ-az')).toEqual([65, 90, 45, 97, 122])
  })
})

test('alphabet and digits', () => {
  expect(
    binaryToString(alphadigits)
  ).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
})

test('fitness function', () => {
  expect(
    fitness('The quick brown fox jumps over the lazy dog')
  ).toBeGreaterThan(
    fitness('Aiu-felcd-fgrexmdds*asddd;gbgw\'vbn-gghv*fxx')
  )
})

test('readHexStrings', () => {
  expect(
    readHexStrings('./4.txt').length
  ).toBe(327)
})

test('padding', () => {
  expect(
    padding('PADDING', 15)
  ).toBe('PADDINGPADDINGP')
})

test('toEightBit', () => {
  expect(
    toEightBit(64 - 1)
  ).toBe('00111111')
})

test('hamming', () => {
  expect(
    hamming('this is a test', 'wokka wokka!!!')
  ).toBe(37)
})
