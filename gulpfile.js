require('dotenv').config();
var gulp = require('gulp');
var util = require('gulp-util');
var gulpif = require('gulp-if');

// Gulp Plugins
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var babel = require('gulp-babel');

// Browserify stuff
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Live coding dev tools
var nodemon = require('nodemon');
var browserSync = require('browser-sync').create();

var opts = {
  entries: ['./app/client/index.js'],
  debug: true,
  transform: ['envify', 'babelify', 'rollupify'],
};
var w = watchify(browserify(opts));
var b = browserify(opts);

// Add events
w.on('update', watch);
w.on('log', util.log);

function watch() {
  util.log('Compiling JS...');
  return w.bundle()
    .on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream({once: true}));
}

function bundle() {
  util.log('Compiling JS...');
  return b.bundle()
    .on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpif((process.env.NODE_ENV === 'production'), uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'));
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

  gulp.watch('./styles/**/*.scss',  gulp.series('css'));
  gulp.watch('./app/**/*.js',  gulp.series('lint:js'));

  return nodemon({
    exec: './node_modules/babel-cli/bin/babel-node.js',
    script: './app/server/index.js',
    watch: ['./app/server/**/*.js'],
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
    .pipe(gulpif((process.env.NODE_ENV === 'production'), cssnano()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

// Server scripts
gulp.task('js', function() {
  return gulp.src('./app/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./production'))
});
gulp.task('copy', function() {
  return gulp.src('./app/server/views/index.ejs')
    .pipe(gulp.dest('./production/server/views/'));
});

gulp.task('default', gulp.series(
  gulp.parallel(
    gulp.series(
      'lint:js',
      watch
    ),
    'css'
  ),
  'nodemon'
));

// TODO: Compile server files too to node6
gulp.task('production',
  gulp.parallel(
    bundle,
    'css',
    'copy',
    'js'
  )
);
