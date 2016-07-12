'use strict';

const mqtt = require('mqtt')
const url = require('url');

// Parse
const MQTT_URL = 'mqtt://localhost:1883';
const USERNAME = 'USERNAME';
const PASSWORD = 'PASSWORD';

function connect(cb){
    return mqtt.connect(
        MQTT_URL,
        {
            username: USERNAME,
            password: PASSWORD
        }
    );
}


module.exports = { connect };