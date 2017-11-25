const uuidv4 = require('uuid/v4');
const minioClient = require('./minioClient');
const config = require('../config/config')();

async function getLink(req) {
  const hemera = this;
  const tenantId = hemera.meta$.tenantId;
  if (!tenantId) {
    throw new Error('Missing tenant field');
  }
  const { fileType } = req;
  const objName = tenantId + '/' + uuidv4() + '.' + fileType.toLowerCase();
  const link = minioClient.presignedPutObject('honeycomb-prod', objName, config.expires);
  const signedLink = await link;

  return {
    link: signedLink,
    fileUrl: objName,
  };
}

module.exports = getLink;
