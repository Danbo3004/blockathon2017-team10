const express = require('express');
const { hemera } = require('../config');
const auth = require('../middlewares/auth');

const router = express.Router();
hemera.tag = 'user-instance';

// Receive a request to send an invitation
router.get('/', auth.required, (req, res) => {
  const { role, groupId, message } = req.query;
  const fromEmail = req.user.email; // Email of this token
  const toEmail = req.query.toEmail.split(',');

  if (role.toLowerCase() === 'client' && !groupId) {
    return res.status(400).send('groupId param is required to invite a member to group');
  }

  const action = Object.assign({
    topic: 'user',
    cmd: 'create-invite-token',
    fromEmail,
    toEmail,
    role: role.toLowerCase(),
    message,
    emailInviteLink: true,
  }, groupId ? { groupId } : {});

  return hemera.act(action, (err, result) => {
    if (err) res.status(422).send(`Error when inviting: ${err.message}`);
    else res.json(result);
  });
});

router.post('/', (req, res) => {
  const { token } = req.body;

  return hemera.act({
    topic: 'user',
    cmd: 'verify-invite-token',
    token,
  }, (err, decodedToken) => {
    if (err) res.status(401).send(err.message);
    else res.send(decodedToken);
  });
});

module.exports = router;
