'use strict';

var mqtt = require('mqtt'), url = require('url');
// Parse
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || 'USERNAME:PASSWORD').split(':');


// Create a client connection
var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
    username: auth[0],
    password: auth[1]
});

let isDeviceConnected;

client.on('connect', function() { // When connected

    console.log('>> CONNECTED');

    var devices = ['temperature', 'humidity', 'distance'];
    var index = 0;

    if (!isDeviceConnected) {
        setInterval(publishMessage, 1000);
        isDeviceConnected = true;
    }

    function publishMessage() {
        const message = (Math.random() * 100).toFixed();
        const topic = `/smart-home/out/${devices[index]}`;

        client.publish(topic, message, function() {
            console.log(`>> send message: topic '${topic}', message: '${message}'`);
        });

        index++;
        if (index >= devices.length){
            index = 0;
        }
    }
});
