const client = require('./client');

client.on('connect', function() { // When connected

    // subscribe to a topic
    client.subscribe('/smart-home/in/#', function() {
        client.on('message', function(topic, message, packet) {
            console.log("***********************************");
            console.log("Received '" + message + "' on '" + topic + "'");
            console.log("Packet (payload)" + packet.payload.toString('utf8'));
            console.log("***********************************");
        });
    });
});
