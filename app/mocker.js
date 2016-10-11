'use strict';

module.exports =  function createMocker(config) {

    const client = require('./common').connect(config);

    client.on('connect', ()=>{
        const devices = ['temperature', 'humidity', 'distance', 'servo'];
        let index = 0;

        (function publishMessage() {
            const message = (Math.random() * 100).toFixed();
            const topic = `/smart-home/out/${devices[index]}`;

            client.publish(topic, message);

            index++;

            if (index >= devices.length){
                index = 0;
            }
            setTimeout(publishMessage, 1000);
        }());
    });

}
