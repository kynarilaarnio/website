'use strict';

var buildConfig = require('./build.conf.js');

module.exports = function(config) {
  var configuration = {
    autoWatch : false,

    frameworks: [ 'jasmine' ],

    browsers : [ 'PhantomJS' ],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    files: buildConfig.frontendSource.test
  };

  config.set(configuration);
};
