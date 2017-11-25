const defaultConfig = require('../../serviceConfig')();
// console.log(defaultConfig)
module.exports = Object.assign({}, defaultConfig, {
  collection: 'users',
  searchFields: ['firstName', 'lastName', 'email', 'phone'],
  defaultLimit: 100, // Default num items per list
});
