'use strict';

module.exports =
    require('main-bower-files')()
    .map(function (file) {
        return file.replace('react.js', 'react-with-addons.js');
    });
