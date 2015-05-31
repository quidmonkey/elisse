'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('dev', function (done) {
    runSequence(
        'copy',
        'styles',
        'scripts',
        'inject',
        'browserSync',
        'watch',
        done
    );
});
