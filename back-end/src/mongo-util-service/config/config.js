module.exports = () => {
  function mongoConfig() {
    return {
      mongo: {
        url: process.env.MONGO_URL,
      },
    };
  }

  function hemeraConfig() {
    return {
      logLevel: process.env.HEMERA_LOG_LEVEL,
      childLogger: true,
      tag: 'mongo-util-service',
    };
  }

  function natsConfig() {
    return {
      url: process.env.NATS_URL,
      user: process.env.NATS_USER,
      pass: process.env.NATS_PW,
    };
  }

  return {
    mongoCfg: mongoConfig(),
    natsCfg: natsConfig(),
    hemeraCfg: hemeraConfig(),
  };
};
