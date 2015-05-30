'use strict';

var babel = require('gulp-babel');
var config = require('../config');
var gulp = require('gulp');
var react = require('gulp-react');

module.exports = gulp.task('react', function () {
    var src = config.plugins.concat(config.src);

    return gulp.src(src)
        .pipe(babel({ modules: 'amd', blacklist: ['strict']}))
        .pipe(react())
        .pipe(gulp.dest(config.dist));
});
