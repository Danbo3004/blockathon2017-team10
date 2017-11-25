async function executeResetPassword(msg) {
  const hemera = this;
  const { decodedToken, newPassword } = msg;

  const res = await hemera.act({
    topic: 'user',
    cmd: 'change-password',
    userId: decodedToken._id,
    currentPassword: decodedToken.password,
    newPassword,
  });

  return res;
}

module.exports = executeResetPassword;
