'use strict';

var config = require('../config');
var gulp = require('gulp');
var inject = require('gulp-inject');

module.exports = gulp.task('inject-build', function () {
    process.chdir(config.dist);

    var css = gulp.src(config.css, {read: false});
    var src = gulp.src(config.build.app, {read: false});
    var vendor = gulp.src(config.build.vendor, {read: false});

    return gulp.src(config.html)
        .pipe(inject(css, {ignorePath: config.dist}))
        .pipe(inject(src, {ignorePath: config.dist }))
        .pipe(inject(vendor, {name: 'vendor', ignorePath: config.dist }))
        .pipe(gulp.dest('.'));
});
