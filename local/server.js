'use strict';

const mosca = require('mosca');
require('colors');

const PORT = 1883;

const pubsubsettings = {
    //using ascoltatore
    type: 'mongo', // use mongo DB to store published data
    url: 'mongodb://localhost:27017/mqtt', //mqtt - is a DB in mongo
    pubsubCollection: 'ascoltatori', //collection in MongoDB
    mongo: {}
};

const settings = {
    port: PORT, // port for mqtt client e.g. 'mqtt://localhost:1883'
    backend: pubsubsettings
};

const server = new mosca.Server(settings);

server.on('ready', ()=>{
    console.log(`
Mosca server is up and running
mqtt://localhost:${PORT}
`.yellow);
});

server.on('clientConnected', client=>{
    console.log(`client connected ${client.id.green}`);
});

server.on('clientDisconnected', client=>{
    console.log(`client disconnected ${client.id.red}`);
});
