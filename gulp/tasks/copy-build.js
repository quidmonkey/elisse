'use strict';

var bowerFiles = require('../bower-files');
var config = require('../config');
var del = require('del');
var gulp = require('gulp');
var mergeStream = require('merge-stream');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

module.exports = gulp.task('copy-build', function (done) {
    var mergedStreams = mergeStream();
    var css = bowerFiles.filter(function (fileName) {
        return /.css$/.test(fileName);
    });
    var js = bowerFiles.filter(function (fileName) {
        return /.js$/.test(fileName);
    });

    del.sync(config.dist);

    mergedStreams.add(
        gulp.src(css)
            .pipe(minifyCss())
            .pipe(rename(config.build.vendor.css))
            .pipe(gulp.dest(config.dist))
    );

    mergedStreams.add(
        gulp.src(js)
            .pipe(uglify())
            .pipe(rename(config.build.vendor.js))
            .pipe(gulp.dest(config.dist))
    );

    mergedStreams.add(
        gulp.src(config.html)
            .pipe(gulp.dest(config.dist))
    );

    return mergedStreams;
});
