'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var inject = require('gulp-inject');

var paths = {
    css: 'app/**/*.css',
    jsx: 'app/**/*.jsx'
};
 
gulp.task('inject', function () {
    var sources = gulp.src([paths.jsx, paths.css], {read: false});
 
    return gulp.src('./index.html')
        .pipe(inject(sources))
        .pipe(gulp.dest('./src'));
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch([paths.css, paths.jsx], 'dev');
});

gulp.task('dev', ['browserSync', 'inject']);
gulp.task('default', ['dev', 'watch']);
