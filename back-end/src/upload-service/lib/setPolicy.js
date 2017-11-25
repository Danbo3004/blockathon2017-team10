const minio = require('minio');
const minioClient = require('./minioClient');

function* setPolicy(req) {
  const { bucketname, objPrefix, policy } = req;
  // Find a plan in db
  let minioPolicy = minio.Policy.NONE;
  if (policy === 'readonly') {
    minioPolicy = minio.Policy.READONLY;
  } else if (policy === 'writeonly') {
    minioPolicy = minio.Policy.WRITEONLY;
  } else if (policy === 'readwrite') {
    minioPolicy = minio.Policy.READWRITE;
  }
  return yield minioClient.setBucketPolicy(bucketname, objPrefix, minioPolicy);
}

module.exports = setPolicy;
