'use strict';

var babel = require('gulp-babel');
var config = require('../config');
var gulp = require('gulp');
var notify = require('gulp-notify');
var react = require('gulp-react');

module.exports = gulp.task('react', function () {
    var src = config.plugins.concat(config.src);

    return gulp.src(src)
        .on('error', notify.onError())
        .pipe(babel({ modules: 'amd', blacklist: ['strict']}))
        .pipe(react())
        .pipe(gulp.dest(config.dev));
});
