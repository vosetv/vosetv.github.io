// require = require('esm')(module /*, options*/);
require('babel-register')({
  presets: ['react'],
  plugins: ['transform-es2015-modules-commonjs'],
});
// module.exports = require('./main.js');
require('./server.js');
