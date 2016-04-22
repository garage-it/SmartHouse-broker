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

    var devices = [ 'iddqd', 'other', 'primary' ];
    var index = 0;

    setInterval(publishMessage, 500);

    function publishMessage(){
        // publish a message to a topic
        var message = JSON.stringify({
            device: devices[index],
            time: +new Date(),
            value: 'mqtt eventio #' + index
        });

        client.publish('event', message, function() {
            console.log(message, ' <= message is published');
        });

        index++;
        if (index >= devices.length){
            index = 0;
        }
    }
});