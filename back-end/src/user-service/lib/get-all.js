const EJSON = require('mongodb-extended-json');

const { collection } = require('../config');

async function get(msg) {
  const hemera = this;
  const { offset, limit, role, extend } = msg;
  const { tenantId } = hemera.meta$;

  const query = EJSON.serialize(
    Object.assign({}, { tenantId }, role ? { role } : {}, { status: { $not: /deleted/ } }),
  );

  // Find all users
  const userList = await hemera.act({
    topic: 'mongo-store',
    cmd: 'find',
    collection,
    query,
    options: {
      offset,
      limit,
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

  // Count
  const total = await hemera.act({
    topic: 'mongo-store',
    cmd: 'find',
    collection,
    query,
  });

  if (extend) {
    // Extend groupId field of a user to also include group's data
    const list = await Promise.all(
      userList.result.map(async (item) => {
        const user = Object.assign({}, item);
        if (user.groupId) {
          user.group = await hemera.act({
            topic: 'group',
            cmd: 'getOne',
            groupId: user.groupId,
          });
        }

        return user;
      }),
    );

    return {
      total: total.result.length,
      data: list,
    };
  }

  return {
    total: total.result.length,
    data: userList.result,
  };
}

module.exports = get;
