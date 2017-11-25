const jwt = require('jsonwebtoken');

const { appDomain } = require('../../constants');

// Generate an invite token
async function createInviteToken(msg) {
  const hemera = this;
  const { fromEmail, toEmail, role, groupId, emailInviteLink } = msg;
  const { tenantId } = hemera.meta$;
  if (!tenantId) throw new Error('\'tenant\' is required');

  const tenantData = await hemera.act({
    topic: 'tenant',
    cmd: 'getOne',
    tenantId,
  });
  if (!tenantData._id) throw new Error(`Tenant: ${tenantId} not found`);

  // Check sender authentication to make sure only right people can send invitation
  const fromUser = await hemera.act({
    topic: 'user',
    cmd: 'read',
    email: fromEmail,
  });

  if (!fromUser || !fromUser._id) throw new Error('fromEmail is not valid');
  else if ((!fromUser.role) || (fromUser.role.toLowerCase() !== 'staff' && role.toLowerCase() === 'staff')) {
    // Only staff can invite staff
    throw new Error('Unauthorized to send invitation');
  }

  const finished = [];
  const unfinished = [];
  // Send invitations to a list of email
  await Promise.all(toEmail.map(async (email) => {
    // Check invitee's email
    const toUser = await hemera.act({
      topic: 'user',
      cmd: 'read',
      email,
    });
    // Email existed
    if (toUser && toUser._id) return unfinished.push(email);

    // Generate a token with jwt using tenant secret key and 7 days timebox
    const payload = Object.assign({
      type: 'InviteToken',
      fromEmail,
      toEmail: email,
      tenantId,
      role,
    }, groupId ? { groupId } : null);

    const { secret } = tenantData;
    const token = jwt.sign(payload, secret, {
      expiresIn: '7d',
    });

    // Send invitation email
    if (emailInviteLink) {
      const invitationLink = `http://${tenantId}.${appDomain}/invitation/${token}`;
      hemera.log.info(`Invite link for ${email}`);
      hemera.log.info(invitationLink);

      await hemera.act({
        topic: 'mail',
        cmd: 'send',
        action: 'invite',
        invitationLink,
        toEmail: email,
      });

      return finished.push(email);
    }
    return unfinished.push(email);
  }));

  return { finished, unfinished };
}

module.exports = createInviteToken;
