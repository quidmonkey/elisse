'use strict';

var config = require('../config');
var gulp = require('gulp');
var notify = require('gulp-notify');
var stylint = require('gulp-stylint');
var stylus = require('gulp-stylus');

module.exports = gulp.task('styles', function () {
    return gulp.src(config.styl)
        .on('error', notify.onError())
        .pipe(stylint({ config: '.stylintrc' }))
        .pipe(stylus())
        .pipe(gulp.dest(config.dev));
});
