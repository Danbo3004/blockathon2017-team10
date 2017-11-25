const express = require('express');

const router = express.Router();

const Hemera = require('nats-hemera');

const nats = require('nats').connect({
  url: process.env.NATS_URL,
  user: process.env.NATS_USER,
  pass: process.env.NATS_PW,
});

const hemera = new Hemera(nats, {
  logLevel: process.env.HEMERA_LOG_LEVEL,
  childLogger: true,
  tag: 'tenant-instance',
});

hemera.ready(() => {
  router.get('/add', (req, res, next) => {
    hemera.log.info('---', req.query);

    hemera.act({
      topic: 'math',
      cmd: 'add',
      a: req.query.a,
      b: req.query.b,
    }, (err, result) => {
      res.send(`respond with a resource: ${result}`);
    });
  });
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
