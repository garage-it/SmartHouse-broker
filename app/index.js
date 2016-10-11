'use strict';

module.exports = function runApplication(config) {

    require('./server')(config);

    if (config.log) {
        console.log('::logging enabled::'.yellow);
        require('./logger')(config);
    }

    if (config.mock) {
        console.log('::mock enabled::'.yellow);
        require('./mocker')(config);
    }
};
