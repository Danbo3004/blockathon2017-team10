const retrieve = require('../utils/retrieve');

async function retrieveFunc(msg) {
  const hemera = this;
  const { privateKey } = msg;

  const result = await retrieve(privateKey);

  return result;
}

module.exports = retrieveFunc;
