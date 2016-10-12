'use strict';

require('colors');

const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// load default configuration
const defaultConfig = require('./config');
const commanderPath = path.resolve(__dirname + '/index.js');

module.exports = function(config) {
    // context
    return function(context) {
        const plugin = {};
        Object.assign(plugin, {
            name: 'smart-house-broker',
            init: function() {},
            start: _start.bind(plugin, config, context),
            stop: _stop.bind(plugin, config, context),
            destroy: function() {}
        });
        return plugin;
    };
};

function _init(/*config, context*/) {
    return new Promise(function(resolve, reject) {
        fs.stat(commanderPath, function(err) {
            if (err) {
                reject('File does not exist: ' + commanderPath);
                return;
            }
            resolve();
        });
    });
}

function _start(config, context) {
    const configuration = Object.assign({}, config, context.getConfig(), defaultConfig);
    const programConfiguration = _.pick(configuration, Object.keys(defaultConfig));

    return context.startScript(this.name, commanderPath, 'start', programConfiguration);
}

function _stop(config, context) {
    return context.stopScript(this.name, commanderPath);
}
