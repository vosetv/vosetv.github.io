var gulp = require('gulp');
var util = require('gulp-util');

// Gulp Plugins
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

// Browserify stuff
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Live coding dev tools
var nodemon = require('nodemon');
var browserSync = require('browser-sync').create();

var opts = {
  entries: ['app/client/index.js'],
  debug: true,
  transform: ['envify', 'babelify', 'rollupify'],
};
var b = watchify(browserify(opts));

// Add events
b.on('update', bundle);
b.on('log', util.log);

function bundle() {
  util.log('Compiling JS...');
  return b.bundle()
    .on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream({once: true}));
}

/**
 * Lint js
 */
gulp.task('lint:js', function() {
  return gulp.src('./app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('nodemon', function() {
  browserSync.init({
    open: false,
    notify: false,
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',
    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,
  });

  gulp.watch('styles/**/*.scss',  gulp.series('css'));
  gulp.watch('./app/**/*.js',  gulp.series('lint:js'));

  return nodemon({
    exec: './node_modules/babel-cli/bin/babel-node.js',
    script: 'app/server/index.js',
    watch: ['app/server/**/*.js'],
  })

    .on('start', function onStart() {
      setTimeout(function() {
        browserSync.reload({stream: false});
      }, 500);
    })

    .on('restart', function onRestart() {
      console.log('restarted');
    });
});

gulp.task('css', function() {
  return gulp.src('./styles/main.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
});

// TODO: Make production task that minifies files, and compiles server files.

gulp.task('default', gulp.series(
  gulp.parallel(
    gulp.series(
      'lint:js',
      bundle
    ),
    'css'
  ),
  'nodemon'
));
