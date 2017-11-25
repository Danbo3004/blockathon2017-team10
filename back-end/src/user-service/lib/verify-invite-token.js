const jwt = require('jsonwebtoken');

// Verify validity of an invite token
async function verifyInviteToken(msg) {
  const hemera = this;
  const { token } = msg;
  const { tenantId } = hemera.meta$;

  const tenantData = await hemera.act({
    topic: 'tenant',
    cmd: 'getOne',
    tenantId,
  });
  if (!tenantData._id) throw new Error(`tenant: ${tenantId} not found`);

  const { secret } = tenantData;

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
    const { fromEmail, toEmail, role, type } = decoded;
    if (type !== 'InviteToken') {
      throw new Error('Invalid token');
    }
    if (!fromEmail || !toEmail || !role || decoded.tenantId !== tenantId ||
      (decoded.role.toLowerCase() === 'client' && !decoded.groupId)) {
      throw new Error('Invalid token');
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') throw new Error('Token expired');
    throw new Error(err.message);
  }

  const user = await hemera.act({
    topic: 'user',
    cmd: 'read',
    email: decoded.toEmail,
  });

  if (user && user._id) {
    throw new Error('Token is already used');
  }

  return decoded;
}

module.exports = verifyInviteToken;
