const config = require('./config');

const Raven = require('raven');
const Nats = require('nats');
const Hemera = require('nats-hemera');
const HemeraJoi = require('hemera-joi');
const HemeraMongo = require('hemera-mongo-store');

Raven.config(config.ravenCfg.url, config.ravenCfg.options).install();
const nats = require('nats').connect(config.natsCfg);

const hemera = new Hemera(nats, config.hemeraCfg);

Raven.context(() => {
  Raven.setContext({
    extra: {
      serviceName: 'user-service',
    },
  });
  hemera.transport.on('error', (error) => {
    Raven.captureException(error);
  });
  hemera.on('serverResponseError', (error) => {
    Raven.captureException(error);
  });
  hemera.on('clientResponseError', (error) => {
    Raven.captureException(error);
  });
});

hemera.use(HemeraJoi);
hemera.use(HemeraMongo, config.mongoCfg);

hemera.use(require('./lib'));

hemera.ready(() => {
  hemera.log.info('`user-service` is ready...');
});
