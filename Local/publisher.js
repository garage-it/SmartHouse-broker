'use strict';

const client = require('./client');

const SECOND = 1000;
const ON = 'ON';
const OFF = 'OFF';
let isDeviceConnected;

client.on('connect', function() { // When connected

    console.log('>> CONNECTED');

    var devices = ['temperature', 'humidity', 'distance'];
    var executors = ['blinds'];

    var index = 0;

    setInterval(() => {
        index = getRandomInt(0, executors.length);
        const device = executors[index];
        const message = getRandomInt(0, 100) % 2 === 0 ? ON : OFF;
        publishMessage(device, message);
    }, 10 * SECOND);

    if (!isDeviceConnected) {
        setInterval(() => {
            index = getRandomInt(0, devices.length);
            const device = devices[index];
            const message = getRandomInt(0, 100);
            publishMessage(device, message.toString());
        }, SECOND);
        isDeviceConnected = true;
    }

    function publishMessage(device, message) {
        const topic = `/smart-home/out/${device}`;

        client.publish(topic, message, function() {
            console.log(`>> send message: topic '${topic}', message: '${message}'`);
        });
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
});
