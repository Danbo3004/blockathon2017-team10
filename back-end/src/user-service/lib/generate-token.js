const jwt = require('jsonwebtoken');

async function generateJWT(msg) {
  const hemera = this;
  const { user } = msg;
  const { tenantId } = hemera.meta$;
  if (!tenantId) throw new Error('\'tenantId\' is required');

  const tenantData = await hemera.act({
    topic: 'tenant',
    cmd: 'getOne',
    tenantId,
  });
  if (!tenantData) throw new Error(`tenant: ${tenantId} not found`);

  // Sign jwt using tenant secret key with 60 days expiration time
  const { secret } = tenantData;
  const payload = Object.assign({}, {
    type: 'LoginToken',
    aud: tenantId,
    _id: user._id,
    role: user.role,
    email: user.email,
    tenant: user.tenant,
  });

  return jwt.sign(payload, secret, { expiresIn: '60d' });
}

module.exports = generateJWT;
