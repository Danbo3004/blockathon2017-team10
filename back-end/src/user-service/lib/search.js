const EJSON = require('mongodb-extended-json');

const { searchFields } = require('../config');

function removeEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '');
}

async function search(req) {
  const hemera = this;
  const ObjectID = hemera.exposition['hemera-mongo-store'].mongodb.ObjectID;
  const { query, listGroups } = req;
  const tenant = hemera.meta$.tenant ? hemera.meta$.tenant : hemera.meta$.tenantId;
  // console.log('YOUR QUERY IN USER COLLECTION IS', query);

  const searchQuery = searchFields.map((aField) => {
    const obj = {};
    obj[`${aField}_search`] = {
      $regex: query ? removeEscape(query) : query,
    };
    return obj;
  });
  const groupList = listGroups.map(group => EJSON.serialize(new ObjectID(group)));

  if (groupList.length > 0) {
    searchQuery.push({
      groupId: {
        $in: groupList,
      },
    });
  }
  // console.log('YOUR SEARCH QUERY IN USER COLLECTION IS');
  // console.log(JSON.stringify(searchQuery));
  // Find all groups in db

  const allClients = await hemera.act({
    topic: 'mongo-store',
    cmd: 'find',
    collection: 'users',
    query: {
      role: 'client',
      tenantId: tenant,
      status: EJSON.serialize({ $not: /deleted/ }),
      $or: searchQuery,
    },
  });

  // console.log('Your tenant is', tenant);
  // console.log(allClients.result);
  // return new Error('Something error')
  return allClients.result;
}

module.exports = search;
