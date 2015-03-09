'use strict';

var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var inject = require('gulp-inject');
var react = require('gulp-react');
var stylus = require('gulp-stylus');

var paths = {
    css: 'app/styles/css/**/*.css',
    html: 'index.html',
    js: 'app/**/*.js',
    jsx: 'app/**/*.jsx',
    styl: 'app/styles/stylus/**/*.styl'
};

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: '.'
        }
    });
});
 
gulp.task('inject', function () {
    var bower = gulp.src(bowerFiles(), {read: false});
    var src = gulp.src([paths.css, paths.js], {read: false});

    return gulp.src(paths.html)
        .pipe(inject(bower, {name: 'bower'}))
        .pipe(inject(src))
        .pipe(gulp.dest('.'));
});

gulp.task('react', function () {
    return gulp.src('app/index.jsx')
        .pipe(react())
        .pipe(gulp.dest('app/'));
});

gulp.task('stylus', function () {
    return gulp.src(paths.styl)
        .pipe(stylus())
        .pipe(gulp.dest('app/styles/css'));
});

gulp.task('watch', function () {
    gulp.watch(paths.jsx, ['react']);
    gulp.watch(paths.styl, ['stylus']);
    gulp.watch([paths.css, paths.html, paths.js], ['inject', browserSync.reload]);
});

gulp.task('dev', ['react', 'stylus', 'inject', 'browserSync']);
gulp.task('default', ['dev', 'watch']);
