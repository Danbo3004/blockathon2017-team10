const crypto = require('crypto');

async function encryptPassword(msg) {
  const { password } = msg;
  const hash = crypto.createHash('sha256');
  hash.update(password, 'utf8');
  const hashedPassword = hash.digest('hex');

  return hashedPassword;
}

module.exports = encryptPassword;
