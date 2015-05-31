'use strict';

var babel = require('gulp-babel');
var config = require('../config');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var notify = require('gulp-notify');
var react = require('gulp-react');

module.exports = gulp.task('scripts', function () {
    var src = config.plugins.concat(config.src);

    return gulp.src(src)
        .on('error', notify.onError())
        .pipe(eslint({ useEslintrc: true }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel({ modules: 'amd', blacklist: ['strict']}))
        .pipe(react())
        .pipe(gulp.dest(config.dev));
});
