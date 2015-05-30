'use strict';

var babel = require('gulp-babel');
var config = require('../config');
var gulp = require('gulp');
var react = require('gulp-react');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

module.exports = gulp.task('react-build', function () {
    var src = config.plugins.concat(config.src);

    return gulp.src(src)
        .pipe(babel({ modules: 'amd', blacklist: ['strict']}))
        .pipe(react())
        .pipe(uglify())
        .pipe(rename(config.build.app))
        .pipe(gulp.dest(config.dist));
});
