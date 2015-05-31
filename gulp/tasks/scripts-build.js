'use strict';

var babel = require('gulp-babel');
var config = require('../config');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var react = require('gulp-react');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

module.exports = gulp.task('scripts-build', function () {
    var src = config.plugins.concat(config.src);

    return gulp.src(src)
        .pipe(eslint({ useEslintrc: true }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel({ modules: 'amd', blacklist: ['strict']}))
        .pipe(react())
        .pipe(uglify())
        .pipe(rename(config.build.app))
        .pipe(gulp.dest(config.dist));
});
