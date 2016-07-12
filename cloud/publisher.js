
var mqtt = require('mqtt');

// Create a client connection
var client = mqtt.connect({
    host: 'm21.cloudmqtt.com',
    port: 12787,
    auth: 'wvzaejdb:-rewPZuV-ilM'
});

client.on('connect', function() { // When connected

    client.publish('/smart-home/in/GPIO2', 'OFF', function() {
        console.log("Message is published");
    });
});
