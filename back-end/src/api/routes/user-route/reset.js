const express = require('express');
const { hemera } = require('../config');

const router = express.Router();
hemera.tag = 'user-instance';

// Get a reset link for the provided email
router.get('/', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Request a reset token
  return hemera.act(
    {
      topic: 'user',
      cmd: 'create-reset-token',
      email,
    },
    (err, result) => {
      if (err) res.status(422).send(err.message);
      else res.json(result);
    },
  );
});

// Post a token
router.post('/', (req, res) => {
  const { token, newPassword } = req.query;

  // Token is provide, verify and excute reset password
  hemera.act(
    {
      topic: 'user',
      cmd: 'verify-reset-token',
      token,
    },
    (err, decodedToken) => {
      if (err) res.status(401).send('Invalid token');
      if (newPassword) {
        // New password is provided for this valid token, execute reset
        hemera.act(
          {
            topic: 'user',
            cmd: 'execute-reset-password',
            decodedToken,
            newPassword,
          },
          (error, result) => {
            if (error) res.status(422).send('Cannot reset password');
            else res.json(result);
          },
        );
      } else res.send('Valid token');
    },
  );
});

module.exports = router;
