'use strict';

var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var inject = require('gulp-inject');
var react = require('gulp-react');
var runSequence = require('run-sequence');
var stylus = require('gulp-stylus');

var paths = {
    bower: 'bower_components/**/*.{css,js}',
    css: 'dist/styles/css/',
    dist: 'dist/',
    html: 'index.html',
    js: 'dist/**/*.js',
    jsx: 'src/**/*.jsx',
    styl: 'src/styles/stylus/**/*.styl'
};

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: '.'
        }
    });
});

gulp.task('clean', function (done) {
    del.sync(paths.dist);
    done();
});
 
gulp.task('inject', function () {
    var bower = gulp.src(bowerFiles(), {read: false});
    var src = gulp.src([paths.css + '**/*.css', paths.js], {read: false});

    return gulp.src(paths.html)
        .pipe(inject(bower, {name: 'bower'}))
        .pipe(inject(src))
        .pipe(gulp.dest('.'));
});

gulp.task('react', function () {
    return gulp.src(paths.jsx)
        .pipe(react())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('stylus', function () {
    return gulp.src(paths.styl)
        .pipe(stylus())
        .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function () {
    gulp.watch(paths.jsx, ['react', 'inject', browserSync.reload]);
    gulp.watch(paths.styl, ['stylus', 'inject', browserSync.reload]);
    gulp.watch(paths.html, ['inject', browserSync.reload]);
});

gulp.task('build', function (done) {
    runSequence(
        'clean',
        'react',
        'stylus',
        'inject',
        done
    );
});

gulp.task('dev', ['build', 'browserSync', 'watch']);
gulp.task('default', ['dev']);
