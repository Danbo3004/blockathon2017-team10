async function verifyPassword(msg) {
  const { password, proposed } = msg;
  const hemera = this;
  const hashedPassword = await hemera.act({
    topic: 'user',
    cmd: 'encrypt-password',
    password: proposed,
  });

  return password === hashedPassword;
}

module.exports = verifyPassword;
