const Raven = require('raven');

// Raven auto setup context when using with express :). So we do not need to use Raven.context or Raven.wrap
Raven.config(process.env.RAVEN_URL, {
  captureUnhandledRejections: true,
  autoBreadcrumbs: true,
  level: process.env.LOG_LEVEL || 'info',
}).install();


module.exports = Raven;
