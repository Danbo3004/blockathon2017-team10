const jwt = require('express-jwt');
const LRU = require('lru-cache');
const { hemera } = require('../config');

hemera.tag = 'user-instance';

const secretsCacheOptions = {
  // 5 M unicode points => ~10 MB
  max: 1024 * 1024 * 5,
  length(s) { return s ? s.length : 0; },
  maxAge: 1000 * 60 * 5,
};

const secretsCache = LRU(secretsCacheOptions);

function secretCallback(req, payload, done) {
  // return invalid secret
  if (!req || !payload) return done(null, '.');
  const audience = payload.aud;

  const cachedSecret = secretsCache.get(audience);
  if (cachedSecret) return done(null, cachedSecret);

  return hemera.act({
    topic: 'tenant',
    cmd: 'getOne',
    tenantId: audience,
  }, (err, tenant) => {
    if (err) { return done(err); }
    if (!tenant) { return done(new Error('missing_secret')); }

    const secret = tenant.secret;
    secretsCache.set(audience, secret);
    return done(null, secret);
  });
}

const auth = {
  required: jwt({
    secret: secretCallback,
  }),
};

module.exports = auth;
