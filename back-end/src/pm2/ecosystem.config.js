module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'Contract-service',
      exec_mode: 'cluster',
      cwd: './contract-service',
      script: 'service.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...']
    },
    {
      name: 'Upload-service',
      exec_mode: 'cluster',
      cwd: './upload-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...']
    },
    {
      name: 'Api-service',
      exec_mode: 'cluster',
      cwd: './api/',
      script: './bin/www',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...']
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      host: '0.0.0.0',
      path: '.',
      'post-setup': 'ls -la',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev: {
      user: 'root',
      host: '0.0.0.0',
      path: '.',
      'post-setup': 'ls -la',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};
