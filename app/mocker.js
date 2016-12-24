'use strict';

const client = require('./common').connect();

client.on('connect', ()=> {
    const devices = ['temperature', 'humidity', 'distance', 'servo', 'socket'];
    let index = 0;

    (function publishMessage() {
        let message = (Math.random() * 100).toFixed();
        const topic = `/smart-home/out/${devices[index]}`;

        if (index === 4) {
            message = Math.random() > 0.5 ? 'ON' : 'OFF';
        }

        client.publish(topic, message);

        index++;

        if (index >= devices.length) {
            index = 0;
        }
        setTimeout(publishMessage, 1000);
    }());
});
