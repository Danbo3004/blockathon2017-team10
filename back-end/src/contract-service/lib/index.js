const Hp = require('hemera-plugin');

const storeFunc = require('./store');
const retrieveFunc = require('./retrieve');

exports.plugin = Hp(function userService(options, next) {
  const hemera = this;
  const TOPIC_NAME = 'contract';
  hemera.setOption('payloadValidator', 'hemera-joi');
  const Joi = hemera.exposition['hemera-joi'].joi;

  // Save meta data in smart contract
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'store',
      fileLink: Joi.string().required(),
      hash: Joi.string(),
      privateKey: Joi.string().required()
    },
    storeFunc
  );

  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'retrieve',
      privateKey: Joi.string().required()
    },
    retrieveFunc
  );
  next();
});

exports.options = {};

exports.attributes = {
  name: 'ContractService'
};
