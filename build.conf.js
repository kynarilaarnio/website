'use strict';

var path = require('path');
var wiredep = require('wiredep');

var targetBase = './_static/';

module.exports = {
  frontendSource: {
    code: [
      './client/app/**/*.js',
      '!./client/app/**/*.spec.js'
    ],

    scss: [
      './client/**/*.scss'
    ],

    partials: [
      './client/app/**/*.html'
    ],

    assets: [
      './client/assets/**/*'
    ],

    html: [
      './client/*.html'
    ],

    i18n: [
      './client/assets/i18n/*.json'
    ],

    test: wiredep({ devDependencies: true }).js.concat([
      path.join(targetBase, 'js', 'partials.js'),
      './client/app/**/*.spec.js',
      './client/app/**/*.js'
    ])
  },

  backendSource: {
    code: [
      './server/**/*.js',
      '!./server/**/*.spec.js'
    ],

    test: [
      './server/**/*.spec.js'
    ]
  },

  frontendTarget: {
    js: path.join(targetBase, 'js'),
    css: path.join(targetBase, 'css'),
    assets: targetBase,
    html: targetBase
  }
};
