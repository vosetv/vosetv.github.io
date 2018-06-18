'use strict';

const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const webpack = require('webpack');
const config = require('../webpack.config.js').production;

function build(override = {}) {
  // In dev mode do nothing
  if (process.env.NODE_ENV !== 'production') return Promise.resolve();

  return new Promise(resolve => webpack({ ...config, ...override}, (err, stats) => {
    if (err) {
      log(
        colors.red('Webpack Error:'),
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
