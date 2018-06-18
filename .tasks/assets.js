'use strict';

const gulp = require('gulp');

function build() {
  let stream = gulp.src(global.config.assets.src);
  return stream.pipe(gulp.dest(global.config.assets.dest))
}

build.displayName = 'Build assets';

function watch() {
  gulp.watch(global.config.assets.any, gulp.series([
    build,
    global.reload,
  ]));
}

watch.displayName = 'Watch assets';

module.exports = {
  build,
  watch,
};
