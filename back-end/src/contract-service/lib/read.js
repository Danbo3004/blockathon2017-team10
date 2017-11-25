const EJSON = require('mongodb-extended-json');

const { collection } = require('../config');

async function read(msg) {
  const hemera = this;
  const ObjectID = hemera.exposition['hemera-mongo-store'].mongodb.ObjectID;
  const { userId, email, withGroupInfo } = msg;
  const { tenantId } = hemera.meta$;
  if (!tenantId) throw new Error("'tenant' is required");

  const query = Object.assign(
    {},
    userId ? { _id: new ObjectID(userId) } : {},
    email ? { email } : {},
    { tenantId },
    { status: { $not: /deleted/ } },
  );

  const res = await hemera.act({
    topic: 'mongo-store',
    cmd: 'find',
    collection,
    query: EJSON.serialize(query),
    options: {
      fields: {
        password: 0,
        firstName_search: 0,
        lastName_search: 0,
        email_search: 0,
        phone_search: 0,
        tenantId: 0,
      },
    },
  });

  const user = res.result.length === 1 ? res.result[0] : {};

  if (withGroupInfo && user._id) {
    user.group = await hemera.act({
      topic: 'group',
      cmd: 'getOne',
      groupId: user.groupId,
    });
  }

  return user;
}

module.exports = read;
