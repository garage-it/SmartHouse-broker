'use strict';

const mqtt = require('mqtt')

function connect(config) {
    const MQTT_URL = 'mqtt://' + config['MQTT_HOST_NAME'] + ':' + config['MQTT_PORT'];

    return mqtt.connect(
        MQTT_URL,
        {
            username: config['MQTT_USER_NAME'],
            password: config['MQTT_PASSWORD']
        }
    );
}

module.exports = { connect };
