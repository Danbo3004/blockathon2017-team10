const express = require('express');
const { hemera } = require('../config');
const auth = require('../middlewares/auth');
const parseTenant = require('../middlewares/parseTenant');

const router = express.Router();
hemera.tag = 'user-instance';

// Middlequare to assign tenant to req
router.use(parseTenant);

router.use('/invitation', require('./invitation'));

router.use('/reset', require('./reset'));

// GET users listing
router.get('/', auth.required, (req, res) => {
  // _start is inclusive and _end is exclusive
  const { _start, _end, role } = req.query;
  const offset = _start ? parseInt(_start, 10) - 1 : 0;
  const limit = _end ? parseInt(_end, 10) - offset : 10;
  if (isNaN(offset) || isNaN(limit)) {
    return res.status(400).send('_start and _end query must be number');
  }

  const extend = req.query.extend === 'true';

  return hemera.act(
    {
      topic: 'user',
      cmd: 'get-all',
      offset,
      limit,
      role,
      extend,
    },
    (err, result) => {
      if (err) return res.json(err.message);
      res.set({
        'X-Total-Count': result.total,
      });
      return res.json(result.data);
    },
  );
});

// POST (create) new user
router.post('/', (req, res, next) => {
  const data = Object.assign({}, req.body);
  const { tenant, inviteToken } = data;

  if (!tenant) {
    return res.status(400).send('Tenant field is required');
  }

  if (!data.email || !data.password) {
    return res.status(400).send('Email and password are required');
  }

  if (data.action === 'add-directly') {
    return next();
  }

  if (inviteToken) {
    // An invited user, must be client or staff
    // This user will be created without creating a tenant
    return hemera.act(
      {
        topic: 'user',
        cmd: 'verify-invite-token',
        token: inviteToken,
        meta$: { tenantId: tenant },
      },
      (err, decodedToken) => {
        if (err) {
          return res.status(401).send('Invalid invite token or token is already used');
        }
        // Assign the right fields for this user and create it without creating tenant
        delete data.inviteToken;
        delete data.tenant;
        data.role = decodedToken.role;
        data.email = decodedToken.toEmail;
        if (data.role.toLowerCase() === 'client') data.groupId = decodedToken.groupId;
        return hemera.act(
          {
            topic: 'user',
            cmd: 'create',
            meta$: { tenantId: tenant },
            data,
            isFirstUser: false, // invited user, not the one who created the tenant
          },
          (error, result) => {
            if (error) res.status(422).send(error.message);
            else res.json(result);
          },
        );
      },
    );
  }
  // First user, who will create a new tenant
  delete data.tenant;
  data.role = 'staff';
  return hemera.act(
    {
      topic: 'user',
      cmd: 'create',
      meta$: { tenantId: tenant },
      data,
      isFirstUser: true, // also create a new tenant
    },
    (error, result) => {
      if (error) res.status(422).send(error.message);
      else res.json(result);
    },
  );
});

router.post('/', auth.required, (req, res) => {
  const data = Object.assign({}, req.body);
  const { tenant } = data;

  // Create a member directly, check token authorization
  if (req.user.role === 'staff' || req.user.tenant === tenant) {
    if (data.action === 'add-directly') {
      data.tenant = tenant;
      data.role = 'client';
      delete data.action;

      return hemera.act(
        {
          topic: 'user',
          cmd: 'create',
          meta$: { tenantId: tenant },
          data,
          isFirstUser: false,
        },
        (error, result) => {
          if (error) res.status(422).send(error.message);
          else res.json(result);
        },
      );
    }
  }
  return res.status(401).send('Unauthorized to perform this action');
});

// GET (read) user information by Id
router.get('/:id', auth.required, (req, res) => {
  const { id } = req.params;

  if (req.user.role === 'client' && req.user._id !== id) {
    return res.status(401).send('Token is not valid');
  }

  return hemera.act(
    {
      topic: 'user',
      cmd: 'read',
      userId: id,
    },
    (err, result) => {
      if (err) res.status(400).send(err.message);
      res.json(result);
    },
  );
});

// PUT (update) user info
router.put('/:id', auth.required, (req, res) => {
  const { id } = req.params;

  if (req.user.role === 'client' && req.user._id !== id) {
    return res.status(401).send('Token is not valid');
  }

  const data = req.body;
  if (data.tenant && data.tenant !== req.tenantId) {
    return res.status(422).send('Tenant is not allowed to change');
  }

  return hemera.act(
    {
      topic: 'user',
      cmd: 'update',
      userId: id,
      data,
    },
    (err, result) => {
      if (err) res.status(422).send(err.message);
      else res.json(result);
    },
  );
});

// PUT (update) user password
router.put('/:id/password', auth.required, (req, res) => {
  const { id } = req.params;

  if (req.user.role === 'client' && req.user._id !== id) {
    return res.status(401).send('Token is not valid');
  }

  const { currentPassword, newPassword } = req.body;

  return hemera.act(
    {
      topic: 'user',
      cmd: 'change-password',
      userId: id,
      currentPassword,
      newPassword,
    },
    (err, result) => {
      if (err) res.status(422).send(err.message);
      else res.json(result);
    },
  );
});

// DELETE user by id
router.delete('/:id', auth.required, (req, res) => {
  const { id } = req.params;

  if (req.user.role === 'client' && req.user._id !== id) {
    return res.status(401).send('Token is not valid');
  }

  return hemera.act(
    {
      topic: 'user',
      cmd: 'delete',
      userId: id,
    },
    (err, result) => {
      if (err) res.status(422).send(err.message);
      else res.json(result);
    },
  );
});

// POST Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Missing email or password');
  }

  return hemera.act(
    {
      topic: 'user',
      cmd: 'login',
      email,
      password,
    },
    (err, user) => {
      if (err) res.status(422).send(err.message);
      else res.json(user);
    },
  );
});

module.exports = router;
