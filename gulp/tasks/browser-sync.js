'use strict';

var browserSync = require('browser-sync');
var config = require('../config');
var gulp = require('gulp');
var modRewrite = require('connect-modrewrite');

module.exports = gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: config.dev,
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });
});
