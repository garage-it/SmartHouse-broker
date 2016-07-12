'use strict';

require('colors');
const mosca = require('mosca');

const pubsubsettings = {
    //using ascoltatore
    type: 'mongo', // use mongo DB to store published data
    url: 'mongodb://localhost:27017/mqtt', //mqtt - is a DB in mongo
    pubsubCollection: 'ascoltatori', //collection in MongoDB
    mongo: {}
};

const PORT = 1883;
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
