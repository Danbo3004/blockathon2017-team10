const EJSON = require('mongodb-extended-json');
const jwt = require('jsonwebtoken');

const { collection } = require('../config');

const { appDomain } = require('../../constants');

// Generate a reset password token for user
async function createResetToken(msg) {
  const hemera = this;
  const { email, grantAccess } = msg;
  const { tenantId } = hemera.meta$;
  if (!tenantId) throw new Error('\'tenantId\' is required');

  const tenantData = await hemera.act({
    topic: 'tenant',
    cmd: 'getOne',
    tenantId,
  });
  if (!tenantData) throw new Error(`tenant: ${tenantId} not found`);

  const result = await hemera.act({
    topic: 'mongo-store',
    cmd: 'find',
    collection,
    query: EJSON.serialize({
      email,
      tenantId,
      status: { $not: /deleted/ },
    }),
  });

  const userData = result.result[0];
  if (!userData || !userData._id) throw new Error('User does not exist');

  // Sign jwt using tenant secret key with 1 day time box
  const { secret } = tenantData;
  const token = jwt.sign({
    type: 'ResetToken',
    _id: userData._id,
    email: userData.email,
    password: userData.password,
    aud: tenantId,
  }, secret, {
    expiresIn: '1d',
  });

  // Email token to user
  const resetLink = `http://${tenantId}.${appDomain}/users/reset?email=${email}&token=${token}`;
  hemera.log.info(`Reset link for ${userData.email}`);
  hemera.log.info(resetLink);

  if (grantAccess) {
    await hemera.act({
      topic: 'mail',
      cmd: 'send',
      action: 'grantAccess',
      toEmail: email,
      resetLink,
    });
  } else {
    const res = await hemera.act({
      topic: 'mail',
      cmd: 'send',
      action: 'getPassword',
      toEmail: email,
      resetLink,
    });
    return res;
  }
  return { status: 'Ok' };
}

module.exports = createResetToken;
