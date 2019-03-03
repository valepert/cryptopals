const { readLines, decode, arrayToString } = require('../utils')

const expected = arrayToString(decode((readLines('test/7.dec.txt')[0])))

module.exports = {
  expected
}
