'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var inject = require('gulp-inject');

var paths = {
    css: 'app/**/*.css',
    html: 'index.html',
    jsx: 'app/**/*.jsx'
};
 
gulp.task('inject', function () {
    var sources = gulp.src([paths.jsx, paths.css], {read: false});
 
    return gulp.src(paths.html)
        .pipe(inject(sources))
        .pipe(gulp.dest('.'));
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: '.'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch([paths.css, paths.jsx], ['inject', browserSync.reload]);
    gulp.watch(paths.html, browserSync.reload);
});

gulp.task('dev', ['browserSync', 'inject']);
gulp.task('default', ['dev', 'watch']);
