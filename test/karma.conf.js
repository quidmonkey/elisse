'use strict';

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    singleRun: true,
    // files: [
    //   'tests.webpack.js' // just load this file
    // ],
    files: [
      '../src/**/*.{js,jsx}',
      'specs/**/*.js'
    ],
    // preprocessors: {
    //   'tests.webpack.js': ['webpack', 'sourcemap'] // pre-process with webpack and our sourcemap loader
    // },
    preprocessors: {
      '../src/**/*.{js,jsx}': ['webpack', 'sourcemap'],
      'specs/**/*.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec'],
    webpack: {
      devtool: 'inline-source-map', // in-line source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
          }
        ]
      },
      resolve: {
        // tell webpack to look for required files in bower and node
        modulesDirectories: [
          'bower_components',
          'node_modules'
        ],
      }
    },
    webpackServer: {
      noInfo: false // don't spam the console when running in karma!
    },
    colors: true,
  });
};
