var crypto = require('crypto-js');

const key = "sdfjsd1233@#@XBSWC36625";

function encrypt(msg){
  return crypto.AES.encrypt(msg, key).toString();
}

function decrypt(en){
  return crypto.AES.decrypt(en, key).toString(crypto.enc.Utf8);
}

// module.exports.encrypt = encrypt;
// module.exports.decrypt = decrypt;

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}
