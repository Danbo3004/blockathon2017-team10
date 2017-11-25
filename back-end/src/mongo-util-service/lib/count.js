const EJSON = require('mongodb-extended-json');

function count(req, cb) {
  const hemera = this;
  const { query, collection } = req;
  const db = hemera.exposition['hemera-mongo-store'].db;

  const cursor = db.collection(collection).find(EJSON.deserialize(query));

  cursor.count((err, resp) => {
    if (err) {
      return cb(err);
    }
    const result = {
      result: resp,
    };
    cb(err, result);
  });
}

module.exports = count;
