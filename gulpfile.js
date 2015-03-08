'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', ['browserSync']);
