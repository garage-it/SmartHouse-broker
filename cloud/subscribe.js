var argv = require('minimist')(process.argv.slice(2));
var mqtt = require('mqtt'), url = require('url');
// Parse
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || argv.url);
var auth = (mqtt_url.auth || argv.auth).split(':');

// Create a client connection
var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
    username: auth[0],
    password: auth[1]
});

client.on('connect', function() { // When connected

    // subscribe to a topic
    client.subscribe('hello/world', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
            console.log("Packet " + packet);
            console.log("***********************************");
        });
    });
});