'use strict';

var browserSync = require('browser-sync');
var config = require('../config');
var gulp = require('gulp');

module.exports = gulp.task('watch', function () {
    gulp.watch(config.src, ['react', 'inject', browserSync.reload]);
    gulp.watch(config.styl, ['styles', 'inject', browserSync.reload]);
    gulp.watch([config.bower, config.html], ['inject', browserSync.reload]);
});
