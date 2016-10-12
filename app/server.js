'use strict';

require('colors');
const mosca = require('mosca');

module.exports = function runApplication(config) {

    const pubsubsettings = {
        //using ascoltatore
        type: 'mongo', // use mongo DB to store published data
        url: config['MONGO'] + config['MONGO_DB_MQTT'] , //mqtt - is a DB in mongo
        pubsubCollection: 'ascoltatori', //collection in MongoDB
        mongo: {}
    };

    const PORT = parseInt(config['MQTT_PORT']);
    const settings = {
        port: PORT,
        backend: pubsubsettings
    };

    const server = new mosca.Server(settings);

    server.on('ready', ()=>{
        console.log(`
    Mosca server is up and running
    mqtt://localhost:${PORT}
    `.green);
    });

    server.on('clientConnected', client=>{
        console.log(`client connected ${client.id.green}`);
    });

    server.on('clientDisconnected', client=>{
        console.log(`client disconnected ${client.id.red}`);
    });

    return server;
}
