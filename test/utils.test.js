/* global describe, test, expect */
const hello = require('./hello')
const xor = require('./xor')
const brute = require('./brute')
const utils = require('../utils')

const { fitness } = require('../fitness')

describe.skip('Buffer behaviour', () => {
  test('Hello World', () => {
    expect(utils.stringToArray(hello.string)).toEqual(hello.array)
    expect(utils.arrayToString(hello.array)).toEqual(hello.string)
  })

  test('hexadecimal', () => {
    expect(utils.stringToHex(hello.string)).toEqual(hello.hex)
    expect(utils.hexToString(hello.hex)).toEqual(hello.string)
  })

  test('base64', () => {
    expect(utils.encode(hello.array)).toEqual(hello.base64)
    expect(utils.decode(hello.base64)).toEqual(hello.array)
  })
})

test('XOR', () => {
  expect(utils.xor(xor.left, xor.right)).toEqual(xor.result)
  expect(utils.pairXor(xor.pair)).toEqual(xor.result)
})

test('Bruteforce', () => {
  expect(utils.bruteforce(brute.mulPlusOne, brute.fix, brute.vars)).toEqual(brute.result)
})

test('alphabet & co.', () => {
  expect(utils.alphadigits).toEqual(' 0123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
})

test('fitness function', () => {
  expect(
    fitness('The quick brown fox jumps over the lazy dog')
  ).toBeGreaterThan(
    fitness('Aiu-felcd-fgrexmdds*asddd;gbgw\'vbn-gghv*fxx')
  )
})

test('padding', () => {
  expect(
    utils.padding('PADDING', 15)
  ).toBe('PADDINGPADDINGP')
})

test('hamming', () => {
  expect(utils.toEightBits(xor.left)).toBe(xor.leftBinary)
  expect(utils.toEightBits(xor.right)).toBe(xor.rightBinary)
  expect(utils.toEightBits(xor.result)).toBe(xor.resultBinary)

  expect(utils.hamming('this is a test', 'wokka wokka!!!')).toBe(37)

  expect(utils.hammingPair(['this is a test', 'wokka wokka!!!'])).toBe(37)
})
