'use strict';

var gulp = require('gulp');
var config = require('../config');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');

module.exports = gulp.task('stylus-build', function () {
    return gulp.src(config.styl)
        .pipe(stylus({ compress: true }))
        .pipe(rename(config.build.css))
        .pipe(gulp.dest(config.dist));
});
