'use strict';

var gulp = require('gulp');
var config = require('../config');
var stylus = require('gulp-stylus');

module.exports = gulp.task('stylus', function () {
    return gulp.src(config.styl)
        .pipe(stylus())
        .pipe(gulp.dest(config.dev));
});
