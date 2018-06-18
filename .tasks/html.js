'use strict';

const gulp = require('gulp');

function build() {
  let stream = gulp.src(global.config.views.src);
  return stream.pipe(gulp.dest(global.config.views.dest))
}

function watch() {
  gulp.watch(global.config.views.any, gulp.series([
    build,
    global.reload,
  ]));
}

module.exports = {
  build,
  watch,
};
