'use strict';

var config = require('../config');
var gulp = require('gulp');
var inject = require('gulp-inject');

module.exports = gulp.task('inject-build', function () {
    process.chdir(config.dist);

    var css = gulp.src(config.css, {read: false});
    var js = gulp.src(config.js, {read: false});

    return gulp.src(config.html)
        .pipe(inject(css, { ignorePath: config.dist }))
        .pipe(inject(js, { ignorePath: config.dist }))
        .pipe(gulp.dest('.'));
});
