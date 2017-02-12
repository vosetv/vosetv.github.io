require('dotenv').config();
const gulp = require('gulp');
const util = require('gulp-util');
const gulpif = require('gulp-if');

// Gulp Plugins
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');

// Browserify stuff
const watchify = require('watchify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// Live coding dev tools
const nodemon = require('nodemon');
const browserSync = require('browser-sync').create();

const opts = {
  entries: ['./app/client/index.js'],
  debug: true,
  transform: ['envify', 'babelify', 'rollupify'],
};
const w = watchify(browserify(opts));
const b = browserify(opts);

// Add events
w.on('update', watch);
w.on('log', util.log);

function watch() {
  util.log('Compiling JS...');
  return w.bundle()
    .on('error', (err) => {
      util.log('Browserify error:', err);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream({ once: true }));
}

function bundle() {
  return b.bundle()
    .on('error', util.log.bind(util, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif((process.env.NODE_ENV === 'develop'), sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif((process.env.NODE_ENV === 'production'), uglify()))
    .pipe(gulpif((process.env.NODE_ENV === 'develop'), sourcemaps.write('.')))
    .pipe(gulp.dest('./public'));
}

/**
 * Lint js
 */
gulp.task('lint:js', () =>
  gulp.src('./app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
);

gulp.task('nodemon', () => {
  browserSync.init({
    open: false,
    notify: false,
    proxy: 'http://localhost:3000',
    port: 4000,
  });

  gulp.watch('./styles/**/*.scss', gulp.series('css'));
  gulp.watch('./app/**/*.js', gulp.series('lint:js'));

  return nodemon({
    exec: './node_modules/babel-cli/bin/babel-node.js',
    script: './app/server/index.js',
    watch: './app/server/',
  })

    .on('start', () => {
      setTimeout(() => {
        browserSync.reload({ stream: false });
      }, 500);
    })

    .on('restart', () => {
      console.log('Server restarted');
    });
});

gulp.task('css', () =>
  gulp.src('./styles/main.scss')
    .pipe(gulpif((process.env.NODE_ENV === 'develop'), sourcemaps.init({ loadMaps: true })))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif((process.env.NODE_ENV === 'production'), cssnano()))
    .pipe(gulpif((process.env.NODE_ENV === 'develop'), sourcemaps.write('.')))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
);

// Server scripts (production only)
gulp.task('js', () =>
  gulp.src('./app/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./production'))
);

gulp.task('views', () =>
  gulp.src('./app/server/views/*.ejs')
    .pipe(htmlmin({
      minifyJS: true,
      minifyCSS: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
    }))
    .pipe(gulp.dest('./production/server/views/'))
);

gulp.task('default', gulp.series(
  gulp.parallel(
    'lint:js',
    'css',
    watch
  ),
  'nodemon'
));

gulp.task('production',
  gulp.parallel(
    bundle,
    'css',
    'views',
    'js'
  )
);
