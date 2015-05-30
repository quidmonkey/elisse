'use strict';

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    frameworks: ['jasmine'],
    singleRun: true,
    files: [
      'tests.webpack.js' // just load this file
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'] // pre-process with webpack and our sourcemap loader
    },
    reporters: ['spec'],
    webpack: {
      devtool: 'inline-source-map', // in-line source maps instead of the default
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true // don't spam the console when running in karma!
    }
  });
};
