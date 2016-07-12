'use strict';

const mqtt = require('mqtt')
const url = require('url');

// Parse
const mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
const auth = (mqtt_url.auth || 'USERNAME:PASSWORD').split(':');

function connect(cb){
    // Create a client connection
    const client = mqtt.createClient(
        mqtt_url.port,
        mqtt_url.hostname,
        {
            username: auth[0],
            password: auth[1]
        }
    );


    return client;
}


module.exports = { connect };