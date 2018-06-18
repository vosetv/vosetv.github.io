'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const loadPlugins = require('gulp-load-plugins');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const $ = loadPlugins({
  pattern: ['postcss-*'],
  replaceString: /^postcss(-|\.)/,
});

function build() {
  const processors = [
    $.easyImport(),
    $.mixins(),
    $.nested(),
    $.simpleVars(),
    $.stripInlineComments(),
    $.normalize({
      forceImport: true,
    }),
    $.reporter(),
  ];

  let stream = gulp.src(global.config.styles.src);

  if (process.env.NODE_ENV === 'development') {
    stream = stream.pipe(sourcemaps.init());
  }

  stream = stream.pipe(postcss(processors, { syntax: $.scss }))
    // .pipe(autoprefixer());

  if (process.env.NODE_ENV === 'production') {
    stream = stream.pipe(cssnano());
  }

  if (process.env.NODE_ENV === 'development') {
    stream = stream.pipe(sourcemaps.write('.'));
  }

  stream = stream.pipe(gulp.dest(global.config.styles.dest));

  // if (process.env.NODE_ENV === 'development') {
    stream = stream.pipe(global.browsersync.stream({ match: '**/*.css' }));
  // }

  return stream;
}

build.displayName = 'Compile CSS';

function watch() {
  gulp.watch(global.config.styles.any, gulp.series([
    build,
  ]));
}

watch.displayName = 'Watch CSS';

module.exports = {
  build,
  watch,
};
