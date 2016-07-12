'use strict';

require('colors');

let argv = require('minimist')(process.argv.slice(2));

if (argv.help) {
    require('./help');
    return;
}

require('./server');

if (argv.log) {
    console.log('::logging enabled::'.yellow);
    require('./logger');
}

if (argv.mock) {
    console.log('::mock enabled::'.yellow);
    require('./mocker');
}
