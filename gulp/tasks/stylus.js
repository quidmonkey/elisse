'use strict';

var gulp = require('gulp');
var config = require('../config');
var path = require('path');
var stylus = require('gulp-stylus');

module.exports = gulp.task('stylus', function () {
    var env = global.env === 'dev' ? config.dev : config.dist;
    var target = path.join(__dirname, env, config.css);

    return gulp.src(config.styl)
        .pipe(stylus())
        .pipe(gulp.dest(target));
});
