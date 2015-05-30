'use strict';

var fs = require('fs');
var path = require('path');
var tasks = fs.readdirSync('./gulp/tasks/');

tasks.forEach(function (task) {
    require(path.join(__dirname, 'tasks', task));
});
