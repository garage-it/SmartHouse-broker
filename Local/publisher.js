var mqtt = require('mqtt'), url = require('url');
// Parse
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || 'USERNAME:PASSWORD').split(':');

// Create a client connection
var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
    username: auth[0],
    password: auth[1]
});

client.on('connect', function() { // When connected

    setInterval(publishMessage, 4000)

    function publishMessage(){
        // publish a message to a topic
        client.publish('hello/world', Date(), function() {
            console.log("Message is published");
        });
    }
});