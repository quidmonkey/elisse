'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('build', function (done) {
    runSequence(
        'copy-build',
        'styles-build',
        'scripts-build',
        'inject-build',
        done
    );
});
