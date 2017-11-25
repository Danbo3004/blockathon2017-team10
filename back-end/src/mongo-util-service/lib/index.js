const Hp = require('hemera-plugin');

const countFunc = require('./count');

exports.plugin = Hp(function mongoService(options, next) {
  const hemera = this;
  hemera.setOption('payloadValidator', 'hemera-joi');
  const Joi = hemera.exposition['hemera-joi'].joi;

  const topic = 'mongo-util';

  hemera.add({
    topic,
    cmd: 'count',
    collection: Joi.string().required(),
    query: Joi.object().required(),
  }, countFunc);
  next();
});

exports.options = {};

exports.attributes = {
  name: 'mongo-util-service',
};
