'use strict';

require('colors');

const defaultConfig = require('./config');
const fs = require('fs');
const program = require('commander');
const runApplication = require('./app');
const _ = require('lodash');

// Init program version
const packageJSON = JSON.parse(fs.readFileSync('package.json'));
program.version(packageJSON.version);

program
    .command('start [options]')
    .description('Start smart house')
    .option('-m, --mock', 'will start broker with mock data')
    .option('-m, --log', 'will log output')

    .option('--EXEC_MOCK', 'alias of --mock')
    .option('--EXEC_LOGS', 'alias of --log')

    .option('--MONGO [value]', 'MongoDb connection point')
    .option('--MONGO_DB_MQTT [value]', 'Mongodb MQTT database')

    .option('--MQTT_PORT [value]', 'MQTT port')
    .option('--MQTT_HOST_NAME [value]', 'MQTT host name')
    .option('--MQTT_USER_NAME [value]', 'MQTT user name')
    .option('--MQTT_PASSWORD [value]', 'MQTT password')

    .action(function(cmd, options) {
        const allowedKeys = Object.keys(defaultConfig);
        const config =  Object.assign({}, defaultConfig, _.pick(options, allowedKeys));
        config.mock = config.EXEC_MOCK || config.mock;
        config.log = config.EXEC_LOGS || config.log;
        runApplication(config);
    });

program.parse(process.argv);

if (!program.args.length) {
    //program.help();
}
