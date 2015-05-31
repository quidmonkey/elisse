'use strict';

var config = require('../config');
var gulp = require('gulp');
var rename = require('gulp-rename');
var stylint = require('gulp-stylint');
var stylus = require('gulp-stylus');

module.exports = gulp.task('stylus-build', function () {
    return gulp.src(config.styl)
        .pipe(stylint())
        .pipe(stylus({ compress: true }))
        .pipe(rename(config.build.css))
        .pipe(gulp.dest(config.dist));
});
