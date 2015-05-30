'use strict';

var gulp = require('gulp');

module.exports = gulp.task('dev', ['build', 'browserSync', 'watch']);
