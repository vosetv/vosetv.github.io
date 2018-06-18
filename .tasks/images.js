'use strict';

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

function build() {
  let stream = gulp.src(global.config.img.src);
  if (process.env.NODE_ENV === 'production') {
    stream = stream
      .pipe(changed(global.config.img.dest))
      .pipe(imagemin({
        verbose: true,
      }));
  }
  return stream.pipe(gulp.dest(global.config.img.dest))
}

build.displayName = 'Compress images';

function watch() {
  gulp.watch(global.config.img.any, gulp.series([
    build,
    global.reload,
  ]));
}

watch.displayName = 'Watch images';

module.exports = {
  build,
  watch,
};
