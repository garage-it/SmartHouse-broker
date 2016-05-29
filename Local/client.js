const mqtt = require('mqtt'), url = require('url');

// Parse
const mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'CLOUD');
const auth = (mqtt_url.auth || 'USERNAME:PASSWORD').split(':');

// Create a client connection
const client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
    username: auth[0],
    password: auth[1]
});

module.exports = client;