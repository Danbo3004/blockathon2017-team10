module.exports = () => ({
  mongoCfg: {
    mongo: {
      url: process.env.MONGO_URL,
    },
    store: {
      update: {
        returnOriginal: false,
      },
      updateById: {
        returnOriginal: false,
      },
    },
  },
  hemeraCfg: {
    logLevel: process.env.HEMERA_LOG_LEVEL,
    childLogger: true,
    tag: 'user-instance',
    // crashOnFatal: false,
  },
  natsCfg: {
    url: process.env.NATS_URL,
    user: process.env.NATS_USER,
    pass: process.env.NATS_PW,
  },
  ravenCfg: {
    url: process.env.RAVEN_URL,
    options: {
      captureUnhandledRejections: true,
      autoBreadcrumbs: true,
      level: process.env.HEMERA_LOG_LEVEL || 'info',
    },
  },
});
