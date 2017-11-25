const EJSON = require('mongodb-extended-json');

const { collection } = require('../config');

async function updateFunc(msg) {
  const hemera = this;
  const Joi = hemera.exposition['hemera-joi'].joi;

  const { tenantId } = hemera.meta$;
  if (!tenantId) throw new Error("'tenant' is required");

  const { userId } = msg;

  const schema = Joi.object().keys({
    firstName: Joi.string()
      .optional()
      .allow([null, '']),
    lastName: Joi.string()
      .optional()
      .allow([null, '']),
    email: Joi.string()
      .email()
      .optional()
      .allow([null, '']),
    phone: Joi.string()
      .optional()
      .allow([null, '']),
    gender: Joi.string()
      .optional()
      .allow([null, '']),
    position: Joi.string()
      .optional()
      .allow([null, '']),
    status: Joi.string()
      .lowercase()
      .valid(['enable', 'disable', 'deleted']),
    avatar: Joi.string()
      .optional()
      .allow([null, '']),
  });

  const validateResult = Joi.validate(msg.data, schema, { stripUnknown: true });
  if (validateResult.error) throw new Error('Validate error with allowed update schema');
  // console.log(validateResult);
  // Only update fields that are in the schema
  const updateData = {
    $set: Object.assign({}, validateResult.value),
  };

  const res = await hemera.act({
    topic: 'mongo-store',
    cmd: 'updateById',
    collection,
    id: userId,
    data: EJSON.serialize(updateData),
  });

  if (res && res._id) {
    const userInfo = await hemera.act({
      topic: 'user',
      cmd: 'read',
      userId: res._id,
    });

    // Public a message
    hemera.act({
      pubsub$: true,
      topic: 'user',
      cmd: 'after-update',
      user: res,
    });

    if (validateResult.value.status === 'enable') {
      console.log('Trigger a grant access email');
      hemera.act({
        pubsub$: true,
        topic: 'user',
        cmd: 'create-reset-token',
        email: userInfo.email,
        grantAccess: true,
      });
    }

    return userInfo;
  }

  return res;
}

module.exports = updateFunc;
