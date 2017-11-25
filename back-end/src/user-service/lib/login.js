const EJSON = require('mongodb-extended-json');

const { collection } = require('../config');

async function login(msg) {
  const hemera = this;
  const { email } = msg;
  const { tenantId } = hemera.meta$;
  const proposed = msg.password; // from user input

  // Verify email
  let user = await hemera.act({
    topic: 'mongo-store',
    cmd: 'find',
    collection,
    query: EJSON.serialize({
      email,
      tenantId,
      status: { $not: /deleted/ },
    }),
  });

  user = user.result[0];

  if (!user || !user._id) throw new Error('Wrong email or password');

  if (user.status !== 'enable') throw new Error('This user is disabled');

  // Verify password
  const isPwdCorrect = await hemera.act({
    topic: 'user',
    cmd: 'verify-password',
    proposed,
    password: user.password,
  });

  if (isPwdCorrect) {
    // Generate jwt token
    const token = await hemera.act({
      topic: 'user',
      cmd: 'generate-token',
      user,
    });
    const userInfo = await hemera.act({
      topic: 'user',
      cmd: 'read',
      userId: user._id,
    });
    return Object.assign({}, userInfo, { token });
  }
  throw new Error('Wrong email or password');
}

module.exports = login;
