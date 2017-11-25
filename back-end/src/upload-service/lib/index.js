const Hp = require('hemera-plugin');

const genLinkFunc = require('./genLink');
const createBucketFunc = require('./createBucket');
const setPolicyFunc = require('./setPolicy');

exports.plugin = Hp(function uploadService(options, next) {
  const hemera = this;
  const TOPIC_NAME = 'upload';
  hemera.setOption('payloadValidator', 'hemera-joi');
  const Joi = hemera.exposition['hemera-joi'].joi;

  hemera.add({
    topic: TOPIC_NAME,
    cmd: 'genLink',
    fileType: Joi.string().required(),
  }, genLinkFunc);

  hemera.add({
    topic: TOPIC_NAME,
    cmd: 'createBucket',
    // bucketName: Joi.string().required(),
  }, createBucketFunc);

  hemera.add({
    topic: TOPIC_NAME,
    cmd: 'setPolicy',
    bucketName: Joi.string().required(),
    objPrefix: Joi.string().required(),
    policy: Joi.any().valid('none', 'readonly', 'writeonly', 'readwrite'),
  }, setPolicyFunc);

  next();
});

exports.options = {};

exports.attributes = {
  name: 'upload-service',
};
