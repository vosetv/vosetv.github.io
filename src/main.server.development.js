// require = require('esm')(module /*, options*/);
require('ignore-styles');
require('babel-register')({
  presets: ['react'],
  plugins: ['transform-es2015-modules-commonjs'],
});
// module.exports = require('./main.js');
require('./main.server.js');
