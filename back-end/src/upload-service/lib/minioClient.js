const Minio = require('minio');

module.exports = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: 443,
  secure: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});
