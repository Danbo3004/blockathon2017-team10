module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'Cache-service',
      exec_mode: 'cluster',
      cwd: './cache-service/',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Mongo-util-service',
      exec_mode: 'cluster',
      cwd: './mongo-util-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Mail-service',
      exec_mode: 'cluster',
      cwd: './mail-service',
      script: 'service.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Tenant-service',
      exec_mode: 'cluster',
      cwd: './tenant-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Group-service',
      exec_mode: 'cluster',
      cwd: './group-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Plan-service',
      exec_mode: 'cluster',
      cwd: './plan-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Room-service',
      exec_mode: 'cluster',
      cwd: './room-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'User-service',
      exec_mode: 'cluster',
      cwd: './user-service',
      script: 'service.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Booking-service',
      exec_mode: 'cluster',
      cwd: './booking-service',
      script: 'service.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Contact-service',
      exec_mode: 'cluster',
      cwd: './contact-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    // {
    //   name: 'Event-queue-service',
    //   exec_mode: 'cluster',
    //   cwd: './event-queue-service',
    //   script: 'service.js',
    //   max_restarts: 50,
    //   post_update: ['npm install', 'echo updating...'],
    // },
    // {
    //   name: 'Event-process-service',
    //   exec_mode: 'cluster',
    //   cwd: './event-process-service',
    //   script: 'service.js',
    //   max_restarts: 50,
    //   post_update: ['npm install', 'echo updating...'],
    // },
    {
      name: 'Upload-service',
      exec_mode: 'cluster',
      cwd: './upload-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Notification-service',
      exec_mode: 'cluster',
      cwd: './notification-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Agenda-service',
      exec_mode: 'cluster',
      cwd: './agenda-service',
      script: 'index.js',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
    {
      name: 'Api-service',
      exec_mode: 'cluster',
      cwd: './api/',
      script: './bin/www',
      max_restarts: 50,
      post_update: ['npm install', 'echo updating...'],
    },
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
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
    dev: {
      user: 'root',
      host: '0.0.0.0',
      path: '.',
      'post-setup': 'ls -la',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'dev',
      },
    },
  },
};
