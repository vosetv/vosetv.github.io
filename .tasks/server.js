'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const nodemon = require('gulp-nodemon');

function start(done) {
  nodemon({
    exec: './node_modules/@babel/node/bin/babel-node.js \
    --no-babelrc \
    --plugins=transform-es2015-modules-commonjs,@babel/proposal-object-rest-spread',
    script: './src/server/index.js',
    watch: './src/server/',
    done,
  })
    .on('restart', () => util.log(util.colors.cyan('Server restarted')))
    .on('start', global.reload);
}

start.displayName = 'Express server';

module.exports = {
  start: start,
};
