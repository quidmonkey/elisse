'use strict';

var bowerFiles = require('../bower-files');
var config = require('../config');
var gulp = require('gulp');
var inject = require('gulp-inject');
var path = require('path');

module.exports = gulp.task('inject', function () {
    var bower = gulp.src(bowerFiles, {read: false});
    var css = gulp.src(path.join(config.dev, config.css), {read: false});

    return gulp.src(config.html)
        .pipe(inject(bower, {
                name: 'vendor',
                transform: function (filepath) {
                    if (/require/.test(filepath)) {
                        return '<script src="' + filepath + '" data-main="./index"></script>';
                    }

                    return inject.transform.apply(inject.transform, arguments);
                }
        }))
        .pipe(inject(css, {ignorePath: config.dev}))
        .pipe(gulp.dest(config.dev));
});
