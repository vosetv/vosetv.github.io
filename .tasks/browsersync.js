'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

const bs = require('browser-sync').create();
const config = require('../webpack.config.js').dev;

const bundler = webpack(config);

function browsersync() {
  return new Promise(resolve => {
    bs.init(
      {
        notify: true,
        open: false,
        ui: false,
        port: 4000,
        // https: {
        //   key: './src/server/localhost.key',
        //   cert: './src/server/localhost.crt',
        // },
        proxy: {
          target: 'https://localhost:4004', // server/index.js
          ws: true,
          middleware: [
            webpackDevMiddleware(bundler, {
              publicPath: config.output.publicPath,
              stats: { colors: true },
            }),
            webpackHotMiddleware(bundler, {
              log: console.log,
              path: '/__webpack_hmr',
              heartbeat: 10 * 1000,
            }),
          ],
        },
      },
      resolve,
    );
  });
}

browsersync.displayName = 'browser-sync';

global.browsersync = bs;
global.reload = () =>
  new Promise(resolve => {
    bs.reload();
    resolve();
  });
module.exports = browsersync;
