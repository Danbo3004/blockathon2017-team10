const EJSON = require('mongodb-extended-json');
const boDau = require('khong-dau');
const { searchFields, collection } = require('../config');

function createSearchField(doc, fields) {
  const newDoc = Object.assign({}, doc);
  delete newDoc._id;
  delete newDoc.groupId;
  delete newDoc.joinDate;
  fields.forEach((aField) => {
    if (doc[aField]) {
      newDoc[`${aField}_search`] = boDau(doc[aField]).toLowerCase();
    }
  });
  return newDoc;
}

async function handleDoc(req) {
  const hemera = this;
  const userId = req.user._id;
  if (userId) {
    // Get that user 1st
    const userData = await hemera.act({
      topic: 'mongo-store',
      collection,
      cmd: 'findById',
      id: userId,
    });
    const newUserData = createSearchField(userData, searchFields);
    const updateData = {
      $set: Object.assign({}, newUserData),
    };
    await hemera.act({
      topic: 'mongo-store',
      cmd: 'updateById',
      collection,
      id: userId,
      data: EJSON.serialize(updateData),
    });
  }
}

module.exports = handleDoc;
