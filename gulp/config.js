'use strict';

module.exports = {
    bower: 'bower_components/**/*.{css,js}',
    build: {
        app: 'elisse.min.js',
        css: 'styles/elisse.min.css',
        vendor: {
            css: 'styles/vendor.min.css',
            js: 'vendor.min.js'
        }
    },
    css: 'styles/**/*.css',
    dev: 'dev/',
    dist: 'dist/',
    html: 'index.html',
    js: '**/*.js',
    karma: '../../test/karma.conf.js',
    plugins: [
        'node_modules/rc-css-transition-group/lib/CSSTransitionGroup.js'
    ],
    src: 'src/**/*.{js,jsx}',
    styl: 'src/**/*.styl'
};
