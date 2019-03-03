const string = 'Hello World'
const array = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
const hexvalues = ['48', '65', '6c', '6c', '6f', '20', '57', '6f', '72', '6c', '64']
const hex = hexvalues.join('') // 48656c6c6f20576f726c64
const base64 = 'SGVsbG8gV29ybGQ='

module.exports = {
  string,
  array,
  hex,
  base64
}
