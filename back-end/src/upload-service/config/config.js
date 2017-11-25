const defaultConfig = require('../../serviceConfig')();

module.exports = () => Object.assign({}, defaultConfig, {
  bucket: process.env.MINION_BUCKET,
  endPoint: process.env.MINIO_ENDPOINT,
  expires: 60 * 5, // Link will only valid in 5 minutes
  publicAfterCreate: true, // Set new bucket to public after crete
});
