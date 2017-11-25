const express = require('express');

const { hemera } = require('./config');
// const parseTenant = require('./middlewares/parseTenant');

const router = express.Router();
hemera.tag = 'contract-instance';

router.post('/store', (req, res) => {
  const { privateKey, fileLink } = req.body;
  hemera
    .act({
      topic: 'contract',
      cmd: 'store',
      privateKey,
      fileLink
    })
    .then(result => res.json(result))
    .catch(err => res.response(442, err));
});

router.post('/retrieve', (req, res) => {
  const { privateKey } = req.body;
  hemera
    .act({
      topic: 'contract',
      cmd: 'retrieve',
      privateKey
    })
    .then(result => res.json(result))
    .catch(err => res.response(442, err));
});

module.exports = router;
