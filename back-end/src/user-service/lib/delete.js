const EJSON = require('mongodb-extended-json');

const { collection } = require('../config');

async function deleteFunc(msg) {
  const hemera = this;
  const { userId } = msg;

  const result = await hemera.act({
    topic: 'mongo-store',
    cmd: 'updateById',
    collection,
    id: userId,
    data: EJSON.serialize({ $set: { status: 'deleted' } }),
  });

  return { deleted: result._id ? 1 : 0 };
}

module.exports = deleteFunc;
