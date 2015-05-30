'use strict';

var bowerFiles = require('../bower-files');
var config = require('../config');
var del = require('del');
var gulp = require('gulp');
var mergeStream = require('merge-stream');

module.exports = gulp.task('copy', function (done) {
    var mergedStreams = mergeStream();
    var env = global.env === 'dev' ? config.dev : config.dist;

    del.sync(env);

    mergedStreams.add(
        gulp.src(bowerFiles, {base: '.'})
            .pipe(gulp.dest(env))
    );

    mergedStreams.add(
        gulp.src(config.html)
            .pipe(gulp.dest(env))
    );

    return mergedStreams;
});
