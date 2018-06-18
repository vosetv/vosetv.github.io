'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const webpack = require('webpack');
const config = require('../webpack.config.js').production;

function build(override = {}) {
  // In dev mode do nothing
  if (process.env.NODE_ENV !== 'production') return Promise.resolve();

  return new Promise(resolve => webpack({ ...config, ...override}, (err, stats) => {
    if (err) {
      util.log(
        util.colors.red('Webpack Error:'),
        err.message,
        err.codeFrame ? `\n\n${err.codeFrame}` : ''
      );
    }
    console.log(stats.toString({ /* stats options */ }));
    resolve();
  }))
}

build.displayName = 'JS Production bundle';

module.exports = {
  build,
};
