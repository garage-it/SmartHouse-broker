var mosca = require('mosca');

var pubsubsettings = {
    //using ascoltatore
    type: 'mongo', // use mongo DB to store published data
    url: 'mongodb://localhost:27017/mqtt', //mqtt - is a DB in mongo
    pubsubCollection: 'ascoltatori', //collection in MongoDB
    mongo: {}
};

var settings = {
    port: 1883, // port for mqtt client e.g. 'mqtt://localhost:1883'
    backend: pubsubsettings
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published (payload)', packet.payload.toString('utf8'));
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}