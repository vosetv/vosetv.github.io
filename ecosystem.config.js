module.exports = {
  apps: [
    {
      name: 'vose.tv',
      script: '~/app/main.server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4004,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4004,
      },
    },
  ],
};
