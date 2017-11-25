const minioClient = require('./minioClient');
const config = require('../config/config')();

async function createBucket(req) {
  const hemera = this;
  const { bucketName, objPrefix, policy } = req;
  // Find a plan in db
  const newBucket = await minioClient.makeBucket(bucketName, 'ap-southeast-1');
  if (config.publicAfterCreate) {
    return hemera.act({
      topic: 'upload',
      cmd: 'setPolicy',
      bucketName,
      objPrefix,
      policy,
    });
  }
  return newBucket;
}

module.exports = createBucket;
