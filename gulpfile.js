'use strict';

var babel = require('gulp-babel');
var bowerFiles = require('./bower-files');
var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var inject = require('gulp-inject');
var mergeStream = require('merge-stream');
var modRewrite = require('connect-modrewrite');
var react = require('gulp-react');
var runSequence = require('run-sequence');
var stylus = require('gulp-stylus');

var paths = {
    bower: 'bower_components/**/*.{css,js}',
    css: 'dist/styles/css/',
    dist: 'dist/',
    html: 'index.html',
    js: 'dist/**/*.js',
    plugins: [
        'node_modules/rc-css-transition-group/lib/CSSTransitionGroup.js'
    ],
    src: 'src/**/*.{js,jsx}',
    styl: 'src/**/*.styl'
};

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: paths.dist,
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });
});

gulp.task('copy', function (done) {
    var mergedStreams = mergeStream();

    del.sync(paths.dist);

    mergedStreams.add(
        gulp.src(bowerFiles, {base: '.'})
            .pipe(gulp.dest(paths.dist))
    );

    mergedStreams.add(
        gulp.src(paths.html)
            .pipe(gulp.dest(paths.dist))
    );

    return mergedStreams;
});
 
gulp.task('inject', function () {
    var bower = gulp.src(bowerFiles, {read: false});
    var src = gulp.src([paths.css + '**/*.css'], {read: false});

    return gulp.src(paths.html)
        .pipe(inject(bower, {
                name: 'bower',
                transform: function (filepath) {
                    if (/require/.test(filepath)) {
                        return '<script src="' + filepath + '" data-main="./index"></script>';
                    }

                    return inject.transform.apply(inject.transform, arguments);
                }
        }))
        .pipe(inject(src, {ignorePath: paths.dist}))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('react', function () {
    var src = paths.plugins.concat(paths.src);

    return gulp.src(src)
        .pipe(babel({ modules: 'amd', blacklist: ['strict']}))
        .pipe(react())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('stylus', function () {
    return gulp.src(paths.styl)
        .pipe(stylus())
        .pipe(gulp.dest(paths.css));
});

gulp.task('watch', function () {
    gulp.watch(paths.src, ['react', 'inject', browserSync.reload]);
    gulp.watch(paths.styl, ['stylus', 'inject', browserSync.reload]);
    gulp.watch([paths.bower, paths.html], ['inject', browserSync.reload]);
});

gulp.task('build', function (done) {
    runSequence(
        'copy',
        'stylus',
        'react',
        'inject',
        done
    );
});

gulp.task('dev', ['build', 'browserSync', 'watch']);
gulp.task('default', ['dev']);
