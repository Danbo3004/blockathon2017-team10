const jwt = require('jsonwebtoken');

// Verify validity of a reset password token
async function verifyResetToken(msg) {
  const hemera = this;
  const { token } = msg;
  const { tenantId } = hemera.meta$;

  const tenantData = await hemera.act({
    topic: 'tenant',
    cmd: 'getOne',
    tenantId,
  });
  if (!tenantData) throw new Error(`tenant: ${tenantId} not found`);

  const { secret } = tenantData;

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.type !== 'ResetToken') {
      throw new Error('Invalid token');
    }
    return decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') throw new Error('Token expired');
    throw new Error('Invalid token');
  }
}

module.exports = verifyResetToken;
