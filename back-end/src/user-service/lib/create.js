const EJSON = require('mongodb-extended-json');

const { collection } = require('../config');

async function create(msg) {
  const hemera = this;
  const ObjectID = hemera.exposition['hemera-mongo-store'].mongodb.ObjectID;
  const Joi = hemera.exposition['hemera-joi'].joi;

  const { isFirstUser } = msg;
  const { email } = msg.data;
  const { tenantId } = hemera.meta$;
  console.log('=========');
  console.log(tenantId);
  const user = await hemera.act({
    topic: 'user',
    cmd: 'read',
    email,
  });
  if (user && user._id) throw new Error('Email already existed');

  // isFirstUser flag default to true
  // don't allow to create a user if tenant isn't created yet
  if (isFirstUser) {
    const tenantData = Object.assign(msg.data.companyInfo, {});
    const newTenant = await hemera.act({
      topic: 'tenant',
      cmd: 'create',
      data: tenantData,
    });

    if (!newTenant._id) throw new Error('Cannot create tenant');
  }

  const userSchema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    gender: Joi.string()
      .optional()
      .allow([null, '']),
    phone: Joi.string()
      .optional()
      .allow([null, '']),
    position: Joi.string()
      .optional()
      .allow([null, '']),
    role: Joi.string()
      .lowercase()
      .optional()
      .allow([null, '']),
    status: Joi.string().lowercase(),
    joinDate: Joi.date().timestamp(),
    tenantId: Joi.string(),
    groupId: Joi.object().keys(),
    avatar: Joi.string()
      .optional()
      .allow([null, '']),
  });
  // Tenant is created, create user
  // Format user object to insert to db
  const tenantForUser = msg.data.companyInfo ? msg.data.companyInfo.subdomain : tenantId;
  const data = Object.assign({}, msg.data, { tenantId: tenantForUser });

  data.password = await hemera.act({
    topic: 'user',
    cmd: 'encrypt-password',
    password: data.password,
  });
  data.joinDate = data.joinDate ? new Date(data.joinDate) : new Date();
  if (data.groupId) data.groupId = new ObjectID(data.groupId);

  const validateResult = Joi.validate(data, userSchema, { stripUnknown: true });

  if (validateResult.error) throw new Error('Validate error with user schema');
  const res = await hemera.act({
    topic: 'mongo-store',
    cmd: 'create',
    collection,
    data: EJSON.serialize(validateResult.value),
  });

  // Public a message
  hemera.act({
    pubsub$: true,
    topic: 'user',
    cmd: 'after-create',
    user: res,
  });

  return res;
}

module.exports = create;
