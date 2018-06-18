'use strict';

exports.default = {
  views: {
    any: ['./src/views/**/*.html'], // Files to watch
    src: ['./src/views/**/*.html'], // File(s) to source
    base: './src/views/', // Files to watch
    dest: './.public/', // Where to put transformed file(s)
  },
  styles: {
    any: ['./src/styles/**/*.+(scss|css)'], // Files to watch
    src: ['./src/styles/main.+(scss|css)'], // File(s) to source
    base: './src/styles/', // Files to watch
    dest: './.public/', // Where to put transformed file(s)
  },
  scripts: {
    any: ['./src/scripts/**/*.js'], // Files to watch
    src: ['./src/scripts/index.js'], // File(s) to source
    base: './src/scripts/', // Files to watch
    dest: './.public/', // Where to put transformed file(s)
  },
  img: {
    any: ['./src/img/**/*'], // Files to watch
    src: ['./src/img/**/*'], // File(s) to source
    dest: './.public/img', // Where to put transformed file(s)
  },
  assets: {
    any: ['./src/assets/**/*'], // Files to watch
    src: ['./src/assets/**/*'], // File(s) to source
    dest: './.public/', // Where to put transformed file(s)
  },
};
