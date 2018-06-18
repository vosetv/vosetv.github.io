'use strict';

const gulp = require('gulp');

// Config
const config = require('./gulp.config');

// Tasks
const css = require('./.tasks/css');
const bundle = require('./.tasks/bundle');
const assets = require('./.tasks/assets');
const images = require('./.tasks/images');
const server = require('./.tasks/server');
const browsersync = require('./.tasks/browsersync');

global.config = config.default;

// Build site, works for production and dev
gulp.task('build', gulp.parallel(
  css.build,
  assets.build,
  images.build,
  bundle.build,
));

gulp.task('serve', gulp.parallel(
  browsersync,
  server.start,
));

gulp.task('watch', gulp.parallel(
  css.watch,
  assets.watch,
  images.watch,
));

gulp.task('dev', gulp.series(
  'build',
  gulp.parallel(
    'serve',
    'watch',
  ),
));
