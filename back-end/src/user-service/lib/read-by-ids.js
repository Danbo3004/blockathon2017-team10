const EJSON = require('mongodb-extended-json');

const { collection } = require('../config');

async function readByIds(msg) {
  const hemera = this;
  const ObjectID = hemera.exposition['hemera-mongo-store'].mongodb.ObjectID;
  const { userIds, withGroupInfo } = msg;

  const query = Object.assign(
    {},
    { status: { $not: /deleted/ } },
    { _id: { $in: userIds.map(id => new ObjectID(id)) } },
  );

  const userList = await hemera.act({
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
        gender: 0,
        position: 0,
        joinDate: 0,
      },
    },
  });

  if (withGroupInfo) {
    const clients = userList.result.filter(user => user.role === 'client');
    const rests = userList.result.filter(user => user.role !== 'client');
    const groupIds = clients.map(client => client.groupId);

    const groupList = await hemera.act({
      topic: 'group',
      cmd: 'read-by-ids',
      groupIds,
    });

    const groupDict = {};
    groupList.forEach(group => (groupDict[group._id] = group));

    return [
      ...rests,
      ...clients.map(client =>
        Object.assign(
          {},
          client,
          groupDict[client.groupId] ? { group: groupDict[client.groupId] } : {},
        ),
      ),
    ];
  }

  return userList.result;
}

module.exports = readByIds;
