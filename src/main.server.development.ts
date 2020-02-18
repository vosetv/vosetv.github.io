require = require('esm')(module /*, options*/);
require('ignore-styles');
require('@babel/register')({
  plugins: ['@babel/plugin-proposal-nullish-coalescing-operator'],
  presets: ['@babel/preset-typescript', '@babel/preset-react'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
});
require('./main.server');
