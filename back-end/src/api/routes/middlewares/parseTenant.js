const Raven = require('raven');

const { hemera } = require('../config');

// Middlequare to parse tenant from domain and assign it to req object
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.url === '/' && req.baseUrl === '/users') {
    // Create a new user, skip checking tenant
    next();
  } else if (req.subdomains.length > 1) {
    res.response(400, 'Too many subdomains');
  } else {
    const tenantId = req.subdomains[0];
    if (!tenantId) {
      res.response(400, 'Subdomain is required');
    } else {
      // Check if this tenant exist
      hemera.act({
        topic: 'tenant',
        cmd: 'getOne',
        tenantId,
      }).then((tenant) => {
        if (tenant._id) {
          Raven.setContext({
            extra: {
              tenant,
            },
          });
          // Inject tenantId to req
          req.tenant = tenantId;
          req.tenantName = tenant.name;
          hemera.meta$.tenantId = tenantId;
          next();
        } else {
          res.response(400, 'This tenant does not exist');
        }
      });
    }
  }
};
