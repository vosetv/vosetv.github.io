'use strict';

const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const nodemon = require('gulp-nodemon');

function start(done) {
  nodemon({
    exec: './node_modules/@babel/node/bin/babel-node.js \
    --plugins=@babel/transform-modules-commonjs,@babel/proposal-object-rest-spread',
    script: './src/server/index.js',
    watch: './src/server/',
    done,
  })
    .on('restart', () => log(colors.cyan('Server restarted')))
    .on('start', global.reload);
}

start.displayName = 'Express server';

module.exports = {
  start: start,
};
