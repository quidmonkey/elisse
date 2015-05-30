'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('build', function (done) {
    runSequence(
        'copy',
        'stylus',
        'react',
        'inject',
        done
    );
});
