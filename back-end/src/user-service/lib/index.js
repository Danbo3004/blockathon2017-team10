const Hp = require('hemera-plugin');

const createFunc = require('./create');
const readFunc = require('./read');
const updateFunc = require('./update');
const deleteFunc = require('./delete');
const getFunc = require('./get-all');
const readByIds = require('./read-by-ids');

const login = require('./login');
const generateToken = require('./generate-token');
const changePassword = require('./change-password');
const encryptPassword = require('./encrypt-password');
const verifyPassword = require('./verify-password');

const createResetToken = require('./create-reset-token');
const verifyResetToken = require('./verify-reset-token');
const executeResetPassword = require('./execute-reset-password');

const createInviteToken = require('./create-invite-token');
const verifyInviteToken = require('./verify-invite-token');

const createSearchField = require('./create-search-fields');
const searchFunc = require('./search');

exports.plugin = Hp(function userService(options, next) {
  const hemera = this;
  const TOPIC_NAME = 'user';
  hemera.setOption('payloadValidator', 'hemera-joi');
  const Joi = hemera.exposition['hemera-joi'].joi;

  const PWD_VALIDATION = Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required();
  const EMAIL_VALIDATION = Joi.string()
    .email()
    .lowercase()
    .required();

  // Create a new user command
  const createSchema = Joi.object().keys({
    email: EMAIL_VALIDATION,
    password: PWD_VALIDATION,
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string()
      .lowercase()
      .required()
      .valid(['client', 'staff']),
    status: Joi.string()
      .lowercase()
      .default('enable')
      .valid(['enable', 'disable', 'deleted']),
    joinDate: Joi.date()
      .timestamp()
      .default(Date.now())
      .max('now'),
    companyInfo: Joi.object().keys({
      address: Joi.string().required(),
      phone: Joi.string().required(),
    }),
  });
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'create',
      isFirstUser: Joi.boolean().default(true),
      data: createSchema,
    },
    createFunc,
  );

  // Update a user command
  const updateSchema = Joi.object().keys({
    status: Joi.string()
      .lowercase()
      .valid(['enable', 'disable', 'deleted']),
  });
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'update',
      userId: Joi.string().required(),
      data: updateSchema,
    },
    updateFunc,
  );

  // Read (get) a user command by id or email
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'read',
      userId: Joi.string(),
      email: Joi.string().email(),
      withGroupInfo: Joi.string().default(false),
    },
    readFunc,
  );

  // Get a user list whose id is in an array of ids
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'read-by-ids',
      userIds: Joi.array().items(Joi.string()),
      withGroupInfo: Joi.boolean().default(false),
    },
    readByIds,
  );

  // Delete a user command
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'delete',
      userId: Joi.string().required(),
    },
    deleteFunc,
  );

  // Get a list of users command
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'get-all',
      offset: Joi.number()
        .integer()
        .greater(-1)
        .default(0),
      limit: Joi.number()
        .integer()
        .greater(-1)
        .default(200),
      role: Joi.string(),
      extend: Joi.boolean().default(false),
    },
    getFunc,
  );

  // Change user password command
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'change-password',
      userId: Joi.string().required(),
      currentPassword: Joi.string().required(), // can be hashed password
      newPassword: PWD_VALIDATION,
    },
    changePassword,
  );

  // Encryption command to encrypt user's password
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'encrypt-password',
      password: Joi.string().required(),
    },
    encryptPassword,
  );

  // Verified a proposed plain password with db's hashed password
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'verify-password',
      proposed: Joi.string().required(),
      password: Joi.string().required(),
    },
    verifyPassword,
  );

  // Login command, will return a token if success
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'login',
      email: EMAIL_VALIDATION,
      password: PWD_VALIDATION,
    },
    login,
  );

  // Generate a jwt token command
  const generateTokenSchema = Joi.object().keys({
    _id: Joi.string().required(),
    role: Joi.string().required(),
    email: EMAIL_VALIDATION,
    tenantId: Joi.string().required(),
  });
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'generate-token',
      user: generateTokenSchema,
    },
    generateToken,
  );

  // Send an email to reset passwod
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'create-reset-token',
      email: EMAIL_VALIDATION,
    },
    createResetToken,
  );

  // Verify token
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'verify-reset-token',
      token: Joi.string().required(),
    },
    verifyResetToken,
  );

  // Execute reset password given the correct token and new password
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'execute-reset-password',
      decodedToken: Joi.object().keys({
        _id: Joi.string().required(),
        email: EMAIL_VALIDATION,
      }),
      newPassword: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    },
    executeResetPassword,
  );

  // Create an invite token
  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'create-invite-token',
      fromEmail: EMAIL_VALIDATION,
      toEmail: Joi.array()
        .items(EMAIL_VALIDATION)
        .required(),
      role: Joi.string()
        .lowercase()
        .required()
        .valid(['client', 'staff']),
      groupId: Joi.string(),
      emailInviteLink: Joi.boolean().default(true),
      message: Joi.string().optional(),
    },
    createInviteToken,
  );

  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'verify-invite-token',
      token: Joi.string().required(),
    },
    verifyInviteToken,
  );

  hemera.add(
    {
      topic: TOPIC_NAME,
      cmd: 'search',
      listGroups: Joi.array().required(),
      // query: Joi.string() TODO: Fix here to validate string
    },
    searchFunc,
  );

  hemera.add(
    {
      pubsub$: true,
      topic: TOPIC_NAME,
      cmd: 'after-create',
    },
    createSearchField,
  );

  hemera.add(
    {
      pubsub$: true,
      topic: TOPIC_NAME,
      cmd: 'after-update',
    },
    createSearchField,
  );

  next();
});

exports.options = {};

exports.attributes = {
  name: 'UserService',
};
