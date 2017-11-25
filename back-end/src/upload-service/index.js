const config = require('./config/config')();

const Raven = require('raven');
const Nats = require('nats');
const Hemera = require('nats-hemera');
const HemeraJoi = require('hemera-joi');

Raven.config(config.ravenCfg.url, config.ravenCfg.options).install();
const nats = require('nats').connect(config.natsCfg);

const hemera = new Hemera(nats, config.hemeraCfg);

Raven.context(() => {
  Raven.setContext({
    extra: {
      serviceName: 'upload-service',
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

hemera.use(require('./lib'));

hemera.ready(() => {
  hemera.log.info('`upload-service` is ready...');
});
