require = require('esm')(module /*, options*/);
require('ignore-styles');
require('@babel/register')({
  presets: ['@babel/preset-typescript', '@babel/preset-react'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
require('./main.server');
