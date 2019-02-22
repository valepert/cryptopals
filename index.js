const hex2base64 = (string) => Buffer.from(string, 'hex').toString('base64');

module.exports = {
  hex2base64,
}