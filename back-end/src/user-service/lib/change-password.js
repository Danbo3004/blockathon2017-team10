const EJSON = require('mongodb-extended-json');

const { collection } = require('../config');

async function changePassword(msg) {
  const hemera = this;
  const ObjectID = hemera.exposition['hemera-mongo-store'].mongodb.ObjectID;
  const { currentPassword, newPassword, userId } = msg;

  const findResult = await hemera.act({
    topic: 'mongo-store',
    cmd: 'find',
    collection,
    query: EJSON.serialize({
      _id: new ObjectID(userId),
      status: { $not: /deleted/ },
    }),
    options: {
      fields: {
        firstName_search: 0,
        lastName_search: 0,
        email_search: 0,
        phone_search: 0,
        tenantId: 0,
      },
    },
  });

  const userInfo = findResult.result[0];

  if (!userInfo || !userInfo._id) throw new Error('User does not exist');

  const isCurrentPasswordValid = await hemera.act({
    topic: 'user',
    cmd: 'verify-password',
    password: userInfo.password,
    proposed: currentPassword,
  });

  console.log(isCurrentPasswordValid, userInfo);

  if (!isCurrentPasswordValid) {
    // Fall back, if current password is already hashed
    if (currentPassword !== userInfo.password) throw new Error('Current password is incorrect');
  }

  const hashedPassword = await hemera.act({
    topic: 'user',
    cmd: 'encrypt-password',
    password: newPassword,
  });

  await hemera.act({
    topic: 'mongo-store',
    cmd: 'updateById',
    collection,
    id: userId,
    data: EJSON.serialize({
      $set: {
        password: hashedPassword,
      },
    }),
  });

  delete userInfo.password;
  return userInfo;
}

module.exports = changePassword;
