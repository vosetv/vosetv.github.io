const gulp = require('gulp');
const babel = require('gulp-babel');
const config = require('../gulp.config');

function build() {
  let stream = gulp
    .src('./src/server/**/*.js')
    .pipe(babel({
      babelrc: false,
      plugins: [
        'transform-es2015-modules-commonjs',
        '@babel/proposal-object-rest-spread',
      ],
      presets: [['@babel/env', {
        targets: {
          node: 'current',
        },
      }]],
    }))
    .pipe(gulp.dest('./production'));
  return stream;
}

module.exports = {
  build,
};
