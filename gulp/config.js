'use strict';

module.exports = {
    bower: 'bower_components/**/*.{css,js}',
    css: 'dist/styles/css/',
    dist: 'dist/',
    html: 'index.html',
    js: 'dist/**/*.js',
    karma: '../../test/karma.conf.js',
    plugins: [
        'node_modules/rc-css-transition-group/lib/CSSTransitionGroup.js'
    ],
    src: 'src/**/*.{js,jsx}',
    styl: 'src/**/*.styl'
};
