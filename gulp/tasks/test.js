'use strict';

var argv = require('yargs').argv;
var config = require('../config');
var gulp = require('gulp');
var karma = require('karma').server;
var path = require('path');

module.exports = gulp.task('test', function (done) {
    karma.start({
        browsers: argv.chrome ? ['Chrome'] : ['PhantomJS'],
        configFile: path.join(__dirname, config.karma),
        singleRun: !argv.keepalive,
    }, done);
});
