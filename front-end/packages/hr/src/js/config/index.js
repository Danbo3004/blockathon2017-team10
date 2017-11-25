let buildEnv = process.env.NODE_ENV || 'production';
if (buildEnv !== 'production') buildEnv = 'dev';

const appConfig = require(`./config-${buildEnv}`);
export default appConfig.configs;
