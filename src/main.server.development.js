require = require('esm')(module /*, options*/);
require('ignore-styles');
require('@babel/register')({
  presets: ['@babel/preset-react'],
});
require('./main.server.js');
