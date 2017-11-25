const config = require('./config');

const Nats = require('nats');
const Hemera = require('nats-hemera');
const HemeraJoi = require('hemera-joi');
const HemeraMongo = require('hemera-mongo-store');

const nats = require('nats').connect(config.natsCfg);

const hemera = new Hemera(nats, config.hemeraCfg);

hemera.use(HemeraJoi);
// hemera.use(HemeraMongo, config.mongoCfg);

hemera.use(require('./lib'));

hemera.ready(() => {
  hemera.log.info('`contract-service` is ready...');
});
