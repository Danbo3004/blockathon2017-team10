const store = require('../utils/store');

async function storeFunc(msg) {
  const hemera = this;
  const { privateKey, fileLink } = msg;

  const result = await store(privateKey, { link: fileLink, hash: '' });

  return result;
}

module.exports = storeFunc;
