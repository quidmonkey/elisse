'use strict';

var bowerFiles = require('../bower-files');
var config = require('../config');
var gulp = require('gulp');
var inject = require('gulp-inject');

module.exports = gulp.task('inject', function () {
    var bower = gulp.src(bowerFiles, {read: false});
    var src = gulp.src([config.css + '**/*.css'], {read: false});

    return gulp.src(config.html)
        .pipe(inject(bower, {
                name: 'bower',
                transform: function (filepath) {
                    if (/require/.test(filepath)) {
                        return '<script src="' + filepath + '" data-main="./index"></script>';
                    }

                    return inject.transform.apply(inject.transform, arguments);
                }
        }))
        .pipe(inject(src, {ignorePath: config.dist}))
        .pipe(gulp.dest(config.dist));
});
